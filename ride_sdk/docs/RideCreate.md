# RideCreate


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**driver_name** | **str** |  | 
**total_seats** | **int** |  | 
**pickup_location** | **str** |  | 
**destination** | **str** |  | 
**driver_id** | **int** |  | 

## Example

```python
from ride_sdk.models.ride_create import RideCreate

# TODO update the JSON string below
json = "{}"
# create an instance of RideCreate from a JSON string
ride_create_instance = RideCreate.from_json(json)
# print the JSON string representation of the object
print(RideCreate.to_json())

# convert the object into a dict
ride_create_dict = ride_create_instance.to_dict()
# create an instance of RideCreate from a dict
ride_create_from_dict = RideCreate.from_dict(ride_create_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


