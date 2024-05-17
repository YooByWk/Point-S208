import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.models import Model
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# 명함 탐지 모델 구성
def build_card_detection_model(input_shape=(256, 256, 3)):
    inputs = keras.Input(shape=input_shape)
    # 모델 구성 예시 (필요에 따라 수정 가능)
    x = layers.Conv2D(32, kernel_size=(3, 3), activation="relu")(inputs)
    x = layers.MaxPooling2D(pool_size=(2, 2))(x)
    x = layers.Conv2D(64, kernel_size=(3, 3), activation="relu")(x)
    x = layers.MaxPooling2D(pool_size=(2, 2))(x)
    x = layers.Conv2D(128, kernel_size=(3, 3), activation="relu")(x)
    x = layers.MaxPooling2D(pool_size=(2, 2))(x)
    x = layers.Flatten()(x)
    x = layers.Dense(256, activation="relu")(x)
    outputs = layers.Dense(1, activation="sigmoid")(x)  # 명함인지 아닌지를 나타내는 이진 분류
    model = keras.Model(inputs=inputs, outputs=outputs, name="card_detection_model")
    return model

# 데이터셋 준비
# 데이터셋 디렉토리 구조: dataset/card, dataset/non_card 등
train_datagen = ImageDataGenerator(rescale=1.0/255.0)

train_generator = train_datagen.flow_from_directory(
    "dataset",
    target_size=(256, 256),
    batch_size=32,
    class_mode="binary"
)

# 명함 탐지 모델 생성
card_detection_model = build_card_detection_model()

# 모델 컴파일
card_detection_model.compile(optimizer="adam", loss="binary_crossentropy", metrics=["accuracy"])

# 모델 학습
card_detection_model.fit(train_generator, epochs=10)

# 학습된 모델을 h5 파일로 저장
card_detection_model.save("card_detection_model.h5")
