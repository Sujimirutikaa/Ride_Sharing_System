# DriverCreate


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **str** |  | 
**phone_number** | **str** |  | [optional] 

## Example

```python
from ride_sdk.models.driver_create import DriverCreate

# TODO update the JSON string below
json = "{}"
# create an instance of DriverCreate from a JSON string
driver_create_instance = DriverCreate.from_json(json)
# print the JSON string representation of the object
print(DriverCreate.to_json())

# convert the object into a dict
driver_create_dict = driver_create_instance.to_dict()
# create an instance of DriverCreate from a dict
driver_create_from_dict = DriverCreate.from_dict(driver_create_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


