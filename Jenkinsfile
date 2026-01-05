pipeline {
    agent {
      label {
        label 'slave-01'
        retries 4
      }
    }
    environment {
      GIT_URL = "https://github.com/titas2003/api.myclinic.com.git"
      GIT_BRANCH = "main"
      DOCKER_CRED = "titas2003"
    }
    stages {
        stage("Checkout"){
            steps {
                echo "Checking out ${GIT_URL}..."
                git branch: "${GIT_BRANCH}", credentialsId: "github_titas", url: "${GIT_URL}"
                sh '''
                    ls -l
                    pwd
                '''
            }
        }
        stage("Containerize") {
            steps {
                sh '''
                sudo docker build -t myclinic:v1.${BUILD_NUMBER} .
                sudo docker images
                '''
            }
        }
        stage('Dockerization') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKER_CRED}",
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                        echo ${DOCKER_PASS} | sudo docker login -u ${DOCKER_USER} --password-stdin
                        sudo docker tag myclinic:v1.${BUILD_NUMBER} ${DOCKER_USER}/myclinic:v1.${BUILD_NUMBER}
                        sudo docker push ${DOCKER_USER}/myclinic:v1.${BUILD_NUMBER}
                        docker logout
                    '''
                }
            }
        }
    }
}