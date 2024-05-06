from flask import Flask, request, jsonify
import docker

app = Flask(__name__)
client = docker.from_env()

@app.route('/alert', methods=['POST'])
def alert():
    # 알람 데이터 처리
    alert_data = request.json
    print("Alert Received:", alert_data) # 실제 환경에서는 로깅 시스템을 사용하세요.

    # 알람 조건에 따라 Docker 서비스 스케일 조정
    # 여기서는 예제로 단순화함. 실제로는 alert_data를 분석하여 조건에 맞는 경우에만 스케일 조정
    service_name = "your_service_name" # 실제 서비스 이름으로 변경하세요.
    replicas = 5 # 필요한 레플리카 수로 조정하세요.

    try:
        service = client.services.get(service_name)
        service.scale(replicas)
        return jsonify({"message": "Scaling successful"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/scale_service', methods=['POST'])
def scale_service():
    data = request.json
    service_name = data.get('service_name')
    replicas = data.get('replicas')

    try:
        service = client.services.get(service_name)
        service.scale(replicas)
        return jsonify({"message": "Service scaled successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
