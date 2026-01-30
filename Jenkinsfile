#!groovy

def appData = [
   nodeVersion : "16.18.1",                                         
   failOnXray: false,
   triggerCodeBuild: false,                                                                       
   ]

if (env.BRANCH_NAME == "master") {
   echo "Production realses should go through release pipeline"
} else if (env.BRANCH_NAME == "integration") {
   promote(appData)
} else if (env.BRANCH_NAME == "poc") {
   dev_npmPackage(appData)
} else if (env.BRANCH_NAME == "dev") {
   dev_npmPackage(appData)
} else {
   dev_npmPackage(appData)
}