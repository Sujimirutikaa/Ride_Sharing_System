# RideBookingCreate


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**user_name** | **str** |  | 
**user_id** | **int** |  | 

## Example

```python
from ride_sdk.models.ride_booking_create import RideBookingCreate

# TODO update the JSON string below
json = "{}"
# create an instance of RideBookingCreate from a JSON string
ride_booking_create_instance = RideBookingCreate.from_json(json)
# print the JSON string representation of the object
print(RideBookingCreate.to_json())

# convert the object into a dict
ride_booking_create_dict = ride_booking_create_instance.to_dict()
# create an instance of RideBookingCreate from a dict
ride_booking_create_from_dict = RideBookingCreate.from_dict(ride_booking_create_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


