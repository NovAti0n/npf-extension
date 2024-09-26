export enum Section {
    INFO = "info",
    CONFIG = "config",
    VARIABLES = "variables",
    LATE_VARIABLES = "late_variables",
    SCRIPT = "script",
    INIT = "init",
    IMPORT = "import",
    INCLUDE = "include",
    SENDFILE = "sendfile",
    REQUIRE = "require",
    PYEXIT = "pyexit",
    FILE = "file"
}

const sections = [
    {
        "name": Section.INFO,
        "description": "Contains information about what the test script does. The first line is used as graph title by default.",
        "hasRoleName": false
    },
    {
        "name": Section.CONFIG,
        "description": "Configuration options for the test execution and graph styling.",
        "hasRoleName": false
    },
    {
        "name": Section.VARIABLES,
        "description": "List of variables to define the matrix of parameters to test.",
        "hasRoleName": false
    },
    {
        "name": Section.LATE_VARIABLES,
        "description": "List of variables that are not to be considered part of the test, like constants.",
        "hasRoleName": false
    },
    {
        "name": Section.SCRIPT,
        "description": "Bash commands to execute for the test. Can be defined to run with a specific role when appended with \`@rolename\`.",
        "hasRoleName": true
    },
    {
        "name": Section.INIT,
        "description": "Special script run once before all other scripts.",
        "hasRoleName": false
    },
    {
        "name": Section.IMPORT,
        "description": "Import another test script and optionally under a given role when appended with \`@rolename\`. NPF comes with *modules* test scripts intended for importation. They usually do specific tasks that can be re-used such as setting the CPU frequency.",
        "hasRoleName": true
    },
    {
        "name": Section.INCLUDE,
        "description": "A test script to be included inline. It can be used to organise a test script in multiple files.",
        "hasRoleName": false
    },
    {
        "name": Section.SENDFILE,
        "description": "Send a file that lies with the test script to the remote machine. The source path of the file is given as first argument. The destination path is the test execution directory.",
        "hasRoleName": false
    },
    {
        "name": Section.REQUIRE,
        "description": "Determines whether the test can run. NPF runs a test when all lines of the section returns a zero return code.",
        "hasRoleName": false
    },
    {
        "name": Section.PYEXIT,
        "description": "A Python script executed after the test. It can change and interpret its results.",
        "hasRoleName": false
    },
    {
        "name": Section.FILE,
        "description": "Creates a file with the filename given as first argument. The content of the file is the section content.",
        "hasRoleName": false
    }
]

export default sections;