# ride_sdk.DefaultApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**book_ride_rides_ride_id_book_post**](DefaultApi.md#book_ride_rides_ride_id_book_post) | **POST** /rides/{ride_id}/book | Book Ride
[**create_driver_drivers_post**](DefaultApi.md#create_driver_drivers_post) | **POST** /drivers/ | Create Driver
[**create_ride_rides_post**](DefaultApi.md#create_ride_rides_post) | **POST** /rides/ | Create Ride
[**login_driver_drivers_login_post**](DefaultApi.md#login_driver_drivers_login_post) | **POST** /drivers/login | Login Driver
[**login_user_users_login_post**](DefaultApi.md#login_user_users_login_post) | **POST** /users/login | Login User
[**read_bookings_bookings_get**](DefaultApi.md#read_bookings_bookings_get) | **GET** /bookings/ | Read Bookings
[**read_rides_rides_get**](DefaultApi.md#read_rides_rides_get) | **GET** /rides/ | Read Rides
[**register_user_users_register_post**](DefaultApi.md#register_user_users_register_post) | **POST** /users/register | Register User


# **book_ride_rides_ride_id_book_post**
> RideBooking book_ride_rides_ride_id_book_post(ride_id, ride_booking_create)

Book Ride

### Example


```python
import ride_sdk
from ride_sdk.models.ride_booking import RideBooking
from ride_sdk.models.ride_booking_create import RideBookingCreate
from ride_sdk.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = ride_sdk.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with ride_sdk.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = ride_sdk.DefaultApi(api_client)
    ride_id = 56 # int | 
    ride_booking_create = ride_sdk.RideBookingCreate() # RideBookingCreate | 

    try:
        # Book Ride
        api_response = api_instance.book_ride_rides_ride_id_book_post(ride_id, ride_booking_create)
        print("The response of DefaultApi->book_ride_rides_ride_id_book_post:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->book_ride_rides_ride_id_book_post: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ride_id** | **int**|  | 
 **ride_booking_create** | [**RideBookingCreate**](RideBookingCreate.md)|  | 

### Return type

[**RideBooking**](RideBooking.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **create_driver_drivers_post**
> Driver create_driver_drivers_post(driver_create)

Create Driver

### Example


```python
import ride_sdk
from ride_sdk.models.driver import Driver
from ride_sdk.models.driver_create import DriverCreate
from ride_sdk.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = ride_sdk.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with ride_sdk.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = ride_sdk.DefaultApi(api_client)
    driver_create = ride_sdk.DriverCreate() # DriverCreate | 

    try:
        # Create Driver
        api_response = api_instance.create_driver_drivers_post(driver_create)
        print("The response of DefaultApi->create_driver_drivers_post:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->create_driver_drivers_post: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **driver_create** | [**DriverCreate**](DriverCreate.md)|  | 

### Return type

[**Driver**](Driver.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **create_ride_rides_post**
> Ride create_ride_rides_post(ride_create)

Create Ride

### Example


```python
import ride_sdk
from ride_sdk.models.ride import Ride
from ride_sdk.models.ride_create import RideCreate
from ride_sdk.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = ride_sdk.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with ride_sdk.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = ride_sdk.DefaultApi(api_client)
    ride_create = ride_sdk.RideCreate() # RideCreate | 

    try:
        # Create Ride
        api_response = api_instance.create_ride_rides_post(ride_create)
        print("The response of DefaultApi->create_ride_rides_post:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->create_ride_rides_post: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ride_create** | [**RideCreate**](RideCreate.md)|  | 

### Return type

[**Ride**](Ride.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **login_driver_drivers_login_post**
> Driver login_driver_drivers_login_post(login_request)

Login Driver

### Example


```python
import ride_sdk
from ride_sdk.models.driver import Driver
from ride_sdk.models.login_request import LoginRequest
from ride_sdk.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = ride_sdk.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with ride_sdk.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = ride_sdk.DefaultApi(api_client)
    login_request = ride_sdk.LoginRequest() # LoginRequest | 

    try:
        # Login Driver
        api_response = api_instance.login_driver_drivers_login_post(login_request)
        print("The response of DefaultApi->login_driver_drivers_login_post:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->login_driver_drivers_login_post: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **login_request** | [**LoginRequest**](LoginRequest.md)|  | 

### Return type

[**Driver**](Driver.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **login_user_users_login_post**
> User login_user_users_login_post(login_request)

Login User

### Example


```python
import ride_sdk
from ride_sdk.models.login_request import LoginRequest
from ride_sdk.models.user import User
from ride_sdk.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = ride_sdk.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with ride_sdk.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = ride_sdk.DefaultApi(api_client)
    login_request = ride_sdk.LoginRequest() # LoginRequest | 

    try:
        # Login User
        api_response = api_instance.login_user_users_login_post(login_request)
        print("The response of DefaultApi->login_user_users_login_post:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->login_user_users_login_post: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **login_request** | [**LoginRequest**](LoginRequest.md)|  | 

### Return type

[**User**](User.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **read_bookings_bookings_get**
> List[RideBooking] read_bookings_bookings_get(user_id=user_id)

Read Bookings

### Example


```python
import ride_sdk
from ride_sdk.models.ride_booking import RideBooking
from ride_sdk.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = ride_sdk.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with ride_sdk.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = ride_sdk.DefaultApi(api_client)
    user_id = 56 # int |  (optional)

    try:
        # Read Bookings
        api_response = api_instance.read_bookings_bookings_get(user_id=user_id)
        print("The response of DefaultApi->read_bookings_bookings_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->read_bookings_bookings_get: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **user_id** | **int**|  | [optional] 

### Return type

[**List[RideBooking]**](RideBooking.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **read_rides_rides_get**
> List[Ride] read_rides_rides_get(pickup=pickup, destination=destination, driver_id=driver_id)

Read Rides

### Example


```python
import ride_sdk
from ride_sdk.models.ride import Ride
from ride_sdk.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = ride_sdk.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with ride_sdk.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = ride_sdk.DefaultApi(api_client)
    pickup = 'pickup_example' # str |  (optional)
    destination = 'destination_example' # str |  (optional)
    driver_id = 56 # int |  (optional)

    try:
        # Read Rides
        api_response = api_instance.read_rides_rides_get(pickup=pickup, destination=destination, driver_id=driver_id)
        print("The response of DefaultApi->read_rides_rides_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->read_rides_rides_get: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **pickup** | **str**|  | [optional] 
 **destination** | **str**|  | [optional] 
 **driver_id** | **int**|  | [optional] 

### Return type

[**List[Ride]**](Ride.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **register_user_users_register_post**
> User register_user_users_register_post(user_create)

Register User

### Example


```python
import ride_sdk
from ride_sdk.models.user import User
from ride_sdk.models.user_create import UserCreate
from ride_sdk.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = ride_sdk.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with ride_sdk.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = ride_sdk.DefaultApi(api_client)
    user_create = ride_sdk.UserCreate() # UserCreate | 

    try:
        # Register User
        api_response = api_instance.register_user_users_register_post(user_create)
        print("The response of DefaultApi->register_user_users_register_post:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->register_user_users_register_post: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **user_create** | [**UserCreate**](UserCreate.md)|  | 

### Return type

[**User**](User.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

