exports.handler = async (event) => {
    const { CloudWatchLogsClient, DeleteLogStreamCommand, DescribeLogStreamsCommand } = require("@aws-sdk/client-cloudwatch-logs");
    const client = new CloudWatchLogsClient({ region: "ap-south-1" });
    console.log('getting list of log streams');
    let nextToken = null;
    let logStreams = []
    do {
        let input_command = {
            logGroupName: '/aws/lambda/send-alarms',
            nextToken: nextToken,
            limit: 10
        };
        let command = new DescribeLogStreamsCommand(input_command);
        let resp_cmd = await client.send(command);
        console.log('log streams ' + JSON.stringify(resp_cmd.logStreams));
        nextToken = resp_cmd.nextToken;
        logStreams.concat(resp_cmd.logStreams);
    } while (nextToken != null);

    if (logStreams.length > 0) {
        for (let logStream of logStreams) {
            let input = {
                logGroupName: '/aws/lambda/send-alarms',
                logStreamName: logStream.logStreamName
            }

            let command = new DeleteLogStreamCommand(input);
            let resp_cmd = await client.send(command);
        }
    }

    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('log clean completed!'),
    };
    return response;
};
