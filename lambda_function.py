import json

def lambda_handler(event, context):
    try:
        num1 = float(event.get("num1", 0))
        num2 = float(event.get("num2", 0))
        operation = event.get("operation", "add")

        if operation == "add":
            result = num1 + num2
        elif operation == "subtract":
            result = num1 - num2
        elif operation == "multiply":
            result = num1 * num2
        elif operation == "divide":
            if num2 == 0:
                return {
                    "statusCode": 400,
                    "body": json.dumps({
                        "error": "Cannot divide by zero"
                    })
                }
            result = num1 / num2
        else:
            return {
                "statusCode": 400,
                "body": json.dumps({
                    "error": "Invalid operation"
                })
            }

        return {
            "statusCode": 200,
            "body": json.dumps({
                "num1": num1,
                "num2": num2,
                "operation": operation,
                "result": result
            })
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({
                "error": str(e)
            })
        }