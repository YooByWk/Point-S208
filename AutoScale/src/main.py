from flask import Flask, request, jsonify
import docker

app = Flask(__name__)

# Docker 클라이언트 초기화
client = docker.from_env()

@app.route('/scale_service', methods=['POST'])
def scale_service():
    data = request.json
    service_name = data['service_name']
    replicas = data['replicas']

    try:
        service = client.services.get(service_name)
        service.scale(replicas)
        return jsonify({'message': f"서비스 '{service_name}'를 {replicas} 레플리카로 스케일링했습니다."}), 200
    except docker.errors.NotFound:
        return jsonify({'error': f"서비스 '{service_name}'를 찾을 수 없습니다."}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
