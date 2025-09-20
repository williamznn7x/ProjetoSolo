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

# Define as constantes do treinamento
IMAGE_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS = 100

# Usa um caminho absoluto para a pasta de dados
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
DATA_DIR = os.path.join(parent_dir, 'training')

# Verifica se o diretório de dados existe
if not os.path.isdir(DATA_DIR):
    print(f"Erro: O diretório de dados '{DATA_DIR}' não foi encontrado.")
    print("Por favor, verifique se a pasta 'training' está no mesmo nível da pasta 'backend'.")
    exit()

# Aumento de Dados para o treinamento
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

# Carrega os dados de treinamento
train_generator = train_datagen.flow_from_directory(
    DATA_DIR,
    target_size=IMAGE_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='training'
)

# Carrega os dados de validação
validation_generator = train_datagen.flow_from_directory(
    DATA_DIR,
    target_size=IMAGE_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='validation'
)

# Obtém a lista de classes do gerador de dados
class_names = list(train_generator.class_indices.keys())
num_classes = len(class_names)
print("Classes encontradas:", class_names)
print("Número de classes:", num_classes)

# Obtém os rótulos de classe para calcular os pesos
train_labels = train_generator.classes
class_weights = compute_class_weight(
    'balanced',
    classes=np.unique(train_labels),
    y=train_labels
)
class_weights_dict = dict(zip(np.unique(train_labels), class_weights))
print("Pesos das classes:", class_weights_dict)

# Carrega o modelo pré-treinado MobileNetV2
base_model = MobileNetV2(
    input_shape=(IMAGE_SIZE[0], IMAGE_SIZE[1], 3),
    include_top=False,
    weights='imagenet'
)

# --- CORREÇÃO: Implementando o Fine-Tuning ---
# Congela todas as camadas do modelo base para que elas não sejam treinadas.
base_model.trainable = False

# Adiciona as camadas de classificação personalizadas
model = Sequential([
    base_model,
    Flatten(),
    Dense(128, activation='relu'),
    BatchNormalization(),
    Dropout(0.5),
    Dense(num_classes, activation='softmax')
])

# Compila o modelo com uma taxa de aprendizado para a primeira fase de treinamento
model.compile(
    optimizer=Adam(learning_rate=0.0001),
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# Callbacks
early_stopping = EarlyStopping(
    monitor='val_loss',
    patience=10,
    restore_best_weights=True
)

reduce_lr = ReduceLROnPlateau(
    monitor='val_loss',
    factor=0.2,
    patience=5,
    min_lr=0.00001
)

# Treinamento da primeira fase
print("Iniciando a primeira fase de treinamento (camadas superiores)...")
model.fit(
    train_generator,
    epochs=10,
    validation_data=validation_generator,
    callbacks=[early_stopping, reduce_lr],
    class_weight=class_weights_dict
)

# --- Início do Fine-Tuning ---
# Descongela as últimas 30 camadas do modelo base para um ajuste fino
base_model.trainable = True
for layer in base_model.layers[:-30]:
    layer.trainable = False

# Recompila o modelo com uma taxa de aprendizado muito baixa para o fine-tuning
model.compile(
    optimizer=Adam(learning_rate=0.00001),
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# Treinamento da segunda fase (fine-tuning)
print("Iniciando a segunda fase de treinamento (fine-tuning)...")
history = model.fit(
    train_generator,
    epochs=EPOCHS,
    validation_data=validation_generator,
    callbacks=[early_stopping, reduce_lr],
    class_weight=class_weights_dict
)

# Salvamento do Novo Modelo
model.save("new_soil_model.keras")

print("Treinamento concluído. O novo modelo foi salvo como 'new_soil_model.keras'.")