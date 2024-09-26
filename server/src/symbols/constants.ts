const constants = [
    {
        "name": "NPF_ROOT",
        "description": "Path to NPF (path to the executable)"
    },
    {
        "name": "NPF_BUILD_PATH",
        "description": "Path to the build folder of NPF (by default \`$NPF_ROOT/build\`, can be overriden with \`--build-path\`)"
    },
    {
        "name": "NPF_REPO",
        "description": "Path to the repository under test. If you don't use a repository, it will be the cwdir of the executable."
    },
    {
        "name": "NPF_TESTSCRIPT_PATH",
        "description": "Path to the folder containing the test script"
    },
    {
        "name": "NPF_RESULT_PATH",
        "description": "Path to the result folder (by default \`results/repo/version/\`, or as overwritten by \`--result-path\` option)"
    },
    {
        "name": "NPF_OUTPUT_PATH",
        "description": "Path to the output folder (by default the same as the result result, unless given with \`--output-filename\`)"
    },
    {
        "name": "NPF_NODE_ID",
        "description": "Index of the node used for the same role, in general 1"
    },
    {
        "name": "NPF_NODE_MAX",
        "description": "Number of nodes running the same role, in general 1"
    },
    {
        "name": "NPF_MULTI_ID",
        "description": "Index of the script when running multiple times the same script on each node using the “multi” feature (see [Cluster operations](https://npf.readthedocs.io/en/latest/cluster.html#cluster)) to run multiple time the same script on each role (see [Running the same script multiple times on each machine](https://npf.readthedocs.io/en/latest/cluster.html#multi)), in general 1"
    },
    {
        "name": "NPF_MULTI_MAX",
        "description": "Number of multi as given to the cluster config (default is 1)"
    }
]

export default constants;