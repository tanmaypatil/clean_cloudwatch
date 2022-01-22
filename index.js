exports.handler = async (event) => {
    const { CloudWatchLogsClient, DeleteLogStreamCommand,DescribeLogStreamsCommand } = require("@aws-sdk/client-cloudwatch-logs");
    const client = new CloudWatchLogsClient({ region: "ap-south-1"  });
    console.log('getting list of log streams');
    let nextToken = null;
    do  {
    let  input_command = {
         logGroupName : '/aws/lambda/send-alarms' ,
         nextToken : nextToken,
         limit : 10
    };
    const command = new DescribeLogStreamsCommand(input_command);
    const resp_cmd = await client.send(command);
   // console.log('nextToken '+resp_cmd.nextToken);
    console.log('log streams '+JSON.stringify(resp_cmd.logStreams));
    nextToken = resp_cmd.nextToken;
    } while ( nextToken != null);

    
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('log clean completed!'),
    };
    return response;
};
