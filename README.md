# clean cloudwatch logs
This repository clears the log files for a specific log group .
It does in 2 steps 
* get the log stream for log group
* delete the log stream individually 

Also demonstrates how the nextToken is used in the context of pagination of AWS api.
