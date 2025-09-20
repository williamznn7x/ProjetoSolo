import tensorflow as tf
from tensorflow.keras.models import load_model
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from PIL import Image
import os

app = Flask(__name__)
CORS(app)  # Libera todas as origens

# Carrega o modelo de classificação principal do tipo de solo
model = load_model("new_soil_model.keras")

# Carrega os modelos de análise de características
try:
    moisture_model = load_model("moisture_model.keras")
    texture_model = load_model("texture_model.keras")
    fertility_model = load_model("fertility_model.keras")
    organic_matter_model = load_model("organic_matter_model.keras")
    print("Todos os modelos de atributos foram carregados com sucesso.")
except Exception as e:
    print(f"Erro ao carregar um ou mais modelos de atributos: {e}")
    moisture_model = None
    texture_model = None
    fertility_model = None
    organic_matter_model = None

# Define os diretórios de dados
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
DATA_DIR = os.path.join(parent_dir, 'training')

# Obtém a lista de classes do modelo de tipo de solo
classes = sorted([d for d in os.listdir(DATA_DIR) if os.path.isdir(os.path.join(DATA_DIR, d))])
print("Classes de solo carregadas:", classes)

# Define as classes de outras análises
moisture_classes = ["seco", "úmido", "encharcado"]
texture_classes = ["arenoso", "argiloso", "siltoso"]
fertility_classes = ["alto", "médio", "baixo"]
organic_matter_classes = ["alto", "médio", "baixo"]

def get_soil_suggestions(soil_type, texture, moisture, fertility, organic_matter):
    """Gera sugestões baseadas nas características do solo"""
    suggestions = []

    if soil_type == "Black Soil":
        suggestions.append("Excelente para cultivo de cereais e leguminosas")
        suggestions.append("Requer irrigação adequada devido à alta retenção de água")
    elif soil_type == "Red soil":
        suggestions.append("Ideal para cultivo de arroz e cana-de-açúcar")
        suggestions.append("Beneficia-se de adição de matéria orgânica")

    if texture == "arenoso":
        suggestions.append("Adicione matéria orgânica para melhorar a retenção de água")
        suggestions.append("Considere irrigação mais frequente")
    elif texture == "argiloso":
        suggestions.append("Evite irrigação excessiva para prevenir compactação")
        suggestions.append("Use técnicas de aeração do solo")

    if moisture == "seco":
        suggestions.append("Implemente sistema de irrigação")
        suggestions.append("Adicione cobertura morta para reter umidade")
    elif moisture == "encharcado":
        suggestions.append("Melhore a drenagem do solo")
        suggestions.append("Evite irrigação excessiva")

    if fertility == "baixo":
        suggestions.append("Aplique fertilizantes orgânicos")
        suggestions.append("Considere rotação de culturas")
    elif fertility == "alto":
        suggestions.append("Mantenha práticas de conservação do solo")
        suggestions.append("Monitore regularmente os nutrientes")

    return suggestions

@app.route("/analyze", methods=["POST"])
def analyze():
    file = request.files.get("file")
    if not file:
        return jsonify({"error": "Nenhum arquivo enviado"}), 400

    try:
        # Abre e pré-processa a imagem para os modelos
        img = Image.open(file).convert("RGB")
        img_resized = img.resize((224, 224))
        img_array = np.array(img_resized) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        # 1. Previsão do tipo de solo (principal)
        predictions = model.predict(img_array, verbose=0)
        predicted_class_index = np.argmax(predictions[0])
        confidence = float(predictions[0][predicted_class_index])
        
        soil_type = classes[predicted_class_index]
        if confidence < 0.5:
            return jsonify({
                "soilType": "Não é solo",
                "confidence": round(confidence * 100, 2),
                "dominantColor": "N/A", "texture": "N/A", "moisture": "N/A", "fertility": "N/A",
                "organicMatter": "N/A",
                "suggestions": ["Imagem não reconhecida como solo. Tente uma foto mais clara do solo."]
            })

        # 2. Análises detalhadas com os modelos de IA
        if moisture_model and texture_model and fertility_model and organic_matter_model:
            texture = texture_classes[np.argmax(texture_model.predict(img_array, verbose=0))]
            moisture = moisture_classes[np.argmax(moisture_model.predict(img_array, verbose=0))]
            fertility = fertility_classes[np.argmax(fertility_model.predict(img_array, verbose=0))]
            organic_matter = organic_matter_classes[np.argmax(organic_matter_model.predict(img_array, verbose=0))]
        else:
            # Caso algum modelo não tenha sido carregado, use um fallback
            texture = "N/A"
            moisture = "N/A"
            fertility = "N/A"
            organic_matter = "N/A"
        
        # Gera sugestões baseadas nas características
        suggestions = get_soil_suggestions(soil_type, texture, moisture, fertility, organic_matter)

        # Monta a resposta completa
        result = {
            "soilType": soil_type,
            "confidence": round(confidence * 100, 2),
            "dominantColor": "Marrom",
            "texture": texture,
            "moisture": moisture,
            "fertility": fertility,
            "organicMatter": organic_matter,
            "suggestions": suggestions
        }

        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
