# Ride


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**driver_name** | **str** |  | 
**total_seats** | **int** |  | 
**pickup_location** | **str** |  | 
**destination** | **str** |  | 
**id** | **int** |  | 
**available_seats** | **int** |  | 
**driver_phone** | **str** |  | [optional] 
**bookings** | [**List[RideBooking]**](RideBooking.md) |  | [optional] [default to []]

## Example

```python
from ride_sdk.models.ride import Ride

# TODO update the JSON string below
json = "{}"
# create an instance of Ride from a JSON string
ride_instance = Ride.from_json(json)
# print the JSON string representation of the object
print(Ride.to_json())

# convert the object into a dict
ride_dict = ride_instance.to_dict()
# create an instance of Ride from a dict
ride_from_dict = Ride.from_dict(ride_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


