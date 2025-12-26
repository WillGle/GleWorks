pipeline {
    agent {
        docker {
            image 'node:20-alpine'
            args '-v /var/run/docker.sock:/var/run/docker.sock --user root'
        }
    }

    environment {
        IMAGE_NAME = 'glework-frontend'
        IMAGE_TAG = "${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from Git...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm dependencies...'
                sh 'npm ci'
            }
        }

        stage('Lint') {
            steps {
                echo '🔍 Running ESLint...'
                // Allow warnings but continue
                sh 'npm run lint || echo "Linting warnings found, continuing..."'
            }
        }

        stage('Type Check') {
            steps {
                echo 'Running TypeScript type check...'
                sh 'npm run type-check'
            }
        }

        stage('Build') {
            steps {
                echo 'Building React app with Vite...'
                sh 'npm run build'
                sh 'echo "Build output:" && ls -lh dist/'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                script {
                    // Install Docker CLI in Node container
                    sh 'apk add --no-cache docker-cli'
                    
                    sh """
                        docker build \
                          --build-arg BUILD_DATE=\$(date -u +%Y-%m-%dT%H:%M:%SZ) \
                          --build-arg VCS_REF=\${GIT_COMMIT} \
                          --build-arg VERSION=\${BUILD_NUMBER} \
                          -t ${IMAGE_NAME}:${IMAGE_TAG} \
                          -t ${IMAGE_NAME}:latest \
                          .
                    """
                    
                    sh "docker images ${IMAGE_NAME}"
                }
            }
        }

        stage('Test Container') {
            steps {
                echo 'Testing Docker container...'
                script {
                    sh """
                        # Stop old test container if exists
                        docker stop ${IMAGE_NAME}-test 2>/dev/null || true
                        docker rm ${IMAGE_NAME}-test 2>/dev/null || true
                        
                        # Run container for testing
                        docker run -d -p 8081:80 --name ${IMAGE_NAME}-test ${IMAGE_NAME}:${IMAGE_TAG}
                        
                        # Wait for startup
                        sleep 5
                        
                        # Test if it responds
                        curl -f http://localhost:8081/ || exit 1
                        echo "Container test passed!"
                        
                        # Cleanup test container
                        docker stop ${IMAGE_NAME}-test
                        docker rm ${IMAGE_NAME}-test
                    """
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying to production...'
                script {
                    sh """
                        # Stop and remove old container
                        docker stop ${IMAGE_NAME} 2>/dev/null || true
                        docker rm ${IMAGE_NAME} 2>/dev/null || true
                        
                        # Run new container
                        docker run -d \
                          -p 8080:80 \
                          --name ${IMAGE_NAME} \
                          --restart unless-stopped \
                          ${IMAGE_NAME}:${IMAGE_TAG}
                        
                        # Verify deployment
                        sleep 3
                        docker ps | grep ${IMAGE_NAME}
                        curl -f http://localhost:8080/ && echo "Deployment successful!"
                    """
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            sh 'docker image prune -f || true'
        }
        success {
            echo 'Build succeeded!'
            echo "App running at: http://localhost:8080"
        }
        failure {
            echo 'Build failed!'
        }
    }
}
