pipeline {
    agent {
      label {
        label 'slave-01'
        retries 4
      }
    }
    environment {
      GIT_URL = "https://github.com/titas2003/api.myclinic.com.git"
      DEPLOY_GIT = "https://github.com/titas2003/deploy.myclinic.com.git"
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

        stage("Deploy Script") {
            steps {
                echo "Pulling deployment scripts..."
                git branch: "${GIT_BRANCH}", credentialsId: "github_titas", url: "${DEPLOY_GIT}"
                sh "ls -l"
            }
        }
        stage("Deploy") {
            steps {
                sshPublisher(publishers: [sshPublisherDesc(configName: 'kmaster', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: '''kubectl apply -f api.myclinic.com.yaml
kubectl apply -f svc.api.myclinic.com.yaml''', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: './', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '*.yaml')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
            }
        }
    }
}