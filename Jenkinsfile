import java.time.*
import java.lang.Math

node ('controls') {
def version = "19.700"
def workspace = "/home/sbis/workspace/types_${version}/${BRANCH_NAME}"
    dir (workspace){
        deleteDir()
        checkout([$class: 'GitSCM',
            branches: [[name: "rc-${version}"]],
            doGenerateSubmoduleConfigurations: false,
            extensions: [[
                $class: 'RelativeTargetDirectory',
                relativeTargetDir: "jenkins_pipeline"
                ]],
                submoduleCfg: [],
                userRemoteConfigs: [[
                    credentialsId: CREDENTIAL_ID_GIT,
                    url: "${GIT}:sbis-ci/jenkins_pipeline.git"]]
                                    ])
        helper = load "./jenkins_pipeline/platforma/branch/helper"
        start = load "./jenkins_pipeline/platforma/branch/JenkinsfileTypes"
        run_unit = load "./jenkins_pipeline/platforma/branch/run_unit"
        timeout(time: 60, unit: 'MINUTES') {
			LocalDateTime start_time = LocalDateTime.now();
			echo "Время начала сборки: ${start_time}"
			try {
				start.start(version, workspace, helper)
			} finally {
				LocalDateTime end_time = LocalDateTime.now();
				echo "Время конца сборки: ${end_time}"
				Duration duration = Duration.between(end_time, start_time);
				diff_time = Math.abs(duration.toMillis());
				helper.time_stages(currentBuild, diff_time, "${BUILD_URL}", version, "types")
			}
        }
    }
}
