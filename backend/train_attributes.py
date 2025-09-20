import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Flatten, Dropout, BatchNormalization
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau
import os
import numpy as np
from sklearn.utils.class_weight import compute_class_weight

# Certifique-se de que a biblioteca scikit-learn está instalada:
# pip install scikit-learn

# Define as constantes de treinamento
IMAGE_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS = 50

# Usa um caminho absoluto para a pasta de dados
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)

# Define a lista de atributos e os caminhos de dados correspondentes
attributes = {
    "moisture": ["seco", "úmido", "encharcado"],
    "texture": ["arenoso", "argiloso", "siltoso"],
    "fertility": ["alto", "médio", "baixo"],
    "organic_matter": ["alto", "médio", "baixo"]
}

def train_attribute_model(attribute_name, class_list):
    """
    Função para treinar um modelo de classificação para um atributo específico do solo.
    
    Args:
        attribute_name (str): O nome do atributo (e.g., "moisture", "texture").
        class_list (list): A lista de classes para este atributo.
    """
    print(f"\n{'='*50}")
    print(f"Iniciando o treinamento para o atributo: {attribute_name.upper()}")
    print(f"{'='*50}")
    
    DATA_DIR = os.path.join(parent_dir, f'training_{attribute_name}')
    
    if not os.path.isdir(DATA_DIR):
        print(f"Erro: O diretório de dados '{DATA_DIR}' não foi encontrado.")
        print(f"Por favor, crie a pasta 'training_{attribute_name}' e adicione as imagens rotuladas.")
        return

    train_datagen = ImageDataGenerator(
        rescale=1./255,
        rotation_range=20,
        width_shift_range=0.2,
        height_shift_range=0.2,
        shear_range=0.2,
        zoom_range=0.2,
        horizontal_flip=True,
        fill_mode='nearest',
        validation_split=0.2
    )

    train_generator = train_datagen.flow_from_directory(
        DATA_DIR,
        target_size=IMAGE_SIZE,
        batch_size=BATCH_SIZE,
        class_mode='categorical',
        subset='training'
    )

    validation_generator = train_datagen.flow_from_directory(
        DATA_DIR,
        target_size=IMAGE_SIZE,
        batch_size=BATCH_SIZE,
        class_mode='categorical',
        subset='validation'
    )

    # Obtém os rótulos de classe para calcular os pesos
    train_labels = train_generator.classes
    if len(np.unique(train_labels)) > 1:
        class_weights = compute_class_weight(
            'balanced',
            classes=np.unique(train_labels),
            y=train_labels
        )
        class_weights_dict = dict(zip(np.unique(train_labels), class_weights))
        print("Pesos das classes:", class_weights_dict)
    else:
        # Se houver apenas uma classe, os pesos de classe não são necessários
        class_weights_dict = None

    # Carrega o modelo pré-treinado MobileNetV2
    base_model = MobileNetV2(
        input_shape=(IMAGE_SIZE[0], IMAGE_SIZE[1], 3),
        include_top=False,
        weights='imagenet'
    )
    base_model.trainable = True
    for layer in base_model.layers[:-30]:
        layer.trainable = False

    # Constrói o novo modelo para o atributo
    model = Sequential([
        base_model,
        Flatten(),
        Dense(128, activation='relu'),
        BatchNormalization(),
        Dropout(0.5),
        Dense(len(class_list), activation='softmax')
    ])

    model.compile(
        optimizer=Adam(learning_rate=0.00001),
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )

    early_stopping = EarlyStopping(
        monitor='val_loss',
        patience=10,
        restore_best_weights=True
    )

    reduce_lr = ReduceLROnPlateau(
        monitor='val_loss',
        factor=0.2,
        patience=5,
        min_lr=0.000001
    )

    history = model.fit(
        train_generator,
        epochs=EPOCHS,
        validation_data=validation_generator,
        callbacks=[early_stopping, reduce_lr],
        class_weight=class_weights_dict
    )

    # Salva o modelo treinado
    model_filename = f"{attribute_name}_model.keras"
    model.save(model_filename)
    print(f"\nTreinamento concluído. O modelo foi salvo como '{model_filename}'.")

# Executa o treinamento para cada atributo
for attr, classes in attributes.items():
    train_attribute_model(attr, classes)

print("\nTodos os modelos de atributos foram treinados e salvos!")
