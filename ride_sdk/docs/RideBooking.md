# RideBooking


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**user_name** | **str** |  | 
**id** | **int** |  | 
**ride_id** | **int** |  | 
**user_id** | **int** |  | [optional] 
**user_phone** | **str** |  | [optional] 

## Example

```python
from ride_sdk.models.ride_booking import RideBooking

# TODO update the JSON string below
json = "{}"
# create an instance of RideBooking from a JSON string
ride_booking_instance = RideBooking.from_json(json)
# print the JSON string representation of the object
print(RideBooking.to_json())

# convert the object into a dict
ride_booking_dict = ride_booking_instance.to_dict()
# create an instance of RideBooking from a dict
ride_booking_from_dict = RideBooking.from_dict(ride_booking_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


