const sections = [
    {
        "name": "info",
        "description": "Contains information about what the test script does. The first line is used as graph title by default.",
        "hasRoleName": false
    },
    {
        "name": "config",
        "description": "Configuration options for the test execution and graph styling.",
        "hasRoleName": false
    },
    {
        "name": "variables",
        "description": "List of variables to define the matrix of parameters to test.",
        "hasRoleName": false
    },
    {
        "name": "late_variables",
        "description": "List of variables that are not to be considered part of the test, like constants.",
        "hasRoleName": false
    },
    {
        "name": "script",
        "description": "Bash commands to execute for the test. Can be defined to run with a specific role when appended with \`@rolename\`.",
        "hasRoleName": true
    },
    {
        "name": "init",
        "description": "Special script run once before all other scripts.",
        "hasRoleName": false
    },
    {
        "name": "import",
        "description": "Import another test script and optionally under a given role when appended with \`@rolename\`. NPF comes with *modules* test scripts intended for importation. They usually do specific tasks that can be re-used such as setting the CPU frequency.",
        "hasRoleName": true
    },
    {
        "name": "include",
        "description": "A test script to be included inline. It can be used to organise a test script in multiple files.",
        "hasRoleName": false
    },
    {
        "name": "sendfile",
        "description": "Send a file that lies with the test script to the remote machine. The source path of the file is given as first argument. The destination path is the test execution directory.",
        "hasRoleName": false
    },
    {
        "name": "require",
        "description": "Determines whether the test can run. NPF runs a test when all lines of the section returns a zero return code.",
        "hasRoleName": false
    },
    {
        "name": "pyexit",
        "description": "A Python script executed after the test. It can change and interpret its results.",
        "hasRoleName": false
    },
    {
        "name": "file",
        "description": "Creates a file with the filename given as first argument. The content of the file is the section content.",
        "hasRoleName": false
    }
]

export default sections;