# Requirements Analysis

[TOC]

## 1. Project Overview

Build a restaurant search interface (I name it "BestEat") designed to help users find nearby restaurants using UK postcodes. The application will call the provided API to retrieve data and display key restaurant information in a clear and user-friendly manner.

API endpoint: https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/{postcode}  

Replace {postcode} with a postcode of your choice, such as EC4M 7RF, to return restaurant data for that postcode: https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/EC4M7RF  

## 2. Stakeholders

People who need to search for restaurants with different ratings near a specific postcode.

## 3. User Requirements

1. Users can search for restaurants near a postcode by entering the postcode.
2. The interface displays each restaurant's name, cuisines, rating, and address.
3. Only display information for the top ten rated restaurants.

## 4. Functional Requirements

The functional requirements of the system is mapped to 6 parts according to the system behavior: **User Input Processing, Data Retrieval and Processing, Data Display and Interaction, Error Handling, Performance and Usability**, as well as other **additional features**.

The priority of the functions is considered from **high, medium, low**. All functions with higher priority will be implemented first.

### 1. User Input Processing

| Requirement ID | Description | Acceptance Criteria | Priority |
| ------ | ------ | ------ | ------ |
| **FR-1.1** | The system should provide an input field for users to enter a UK postcode | Users can see a clearly labeled postcode input field on the main page | High |
| **FR-1.2** | The system should validate the entered postcode format | Reject invalid UK postcode formats and return an error message | High |
| **FR-1.3** | The system should handle space tolerance in postcode input | For example, both "EC4M 7RF" and "EC4M7RF" should be accepted by the system | Medium |

### 2. Data Retrieval and Processing

| Requirement ID | Description | Acceptance Criteria | Priority |
| ------ | ------ | ------ | ------ |
| **FR-2.1** | The system should retrieve restaurant data for a specified postcode via the API given | Successfully call the API and retrieve data when a valid postcode is entered | High |
| **FR-2.2** | The system should accurately extract restaurant name, cuisines, rating, and address from the API response | The four data fields displayed match the original data returned by the API | High |
| **FR-2.3** | The system should only display data for the top 10 restaurants | The results page displays a maximum of 10 restaurants (with appropriate display when fewer than 10 restaurants are available) | High |
| **FR-2.4** | The system should handle all possible error scenarios from the API | Display corresponding error messages when the API is unresponsive, returns an error, or returns no data | Medium |
| **FR-2.5** | The system should cache previously queried postcode data with a 5-minute validity period | Repeated queries for the same postcode within a short time do not require additional API calls | Medium |

### 3. Data Display and Interaction

| Requirement ID | Description | Acceptance Criteria | Priority |
| ------ | ------ | ------ | ------ |
| FR-3.1 | The system should clearly display each restaurant's information in a card format | Each restaurant card includes the name, cuisines, rating, and address fields | High |
| FR-3.2 | The system should display restaurant ratings in numerical format | Ratings are displayed in numerical format with one decimal place | High |
| FR-3.3 | The system should display restaurant addresses | Each restaurant's address information is output as text | High |
| FR-3.4 | The system should categorize restaurant ratings into different levels | High ratings use green, medium ratings use yellow, low ratings use red | Medium |
| FR-3.5 | The system should display the number of people who rated the restaurant | Display the number of raters for each restaurant | Medium |
| FR-3.6 | The system should provide functionality to filter by cuisine type | Users can select specific cuisines to display only the top ten restaurants offering that cuisine | Medium |
| FR-3.7 | The system should provide a map view to display restaurants | Display the top ten restaurants on a map, with numbers indicating their ranking | Medium |
| FR-3.8 | The system should provide functionality to sort restaurants by rating | Users can toggle the sorting method for the restaurant list | Low |
| FR-3.9 | The system could provide functionality to sort restaurants with a rating higher or lower than some specific number | Users can choose to show only restaurants above/below a particular rating | Low |

### 4. Error Handling

| Requirement ID | Description | Acceptance Criteria | Priority |
| ------ | ------ | ------ | ------ |
| FR-1.2 | The system should validate the entered postcode format | Reject invalid UK postcode formats and return an error message | High |
| FR-2.4 | The system should handle all possible error scenarios from the API | Display corresponding error messages when the API is unresponsive, returns an error, or returns no data | High |
| FR-4.1 | The system should display a loading state during data retrieval | Display a loading indicator or animation during API requests | Medium |

### 5. Performance and Usability

| Requirement ID | Description | Acceptance Criteria | Priority |
| ------ | ------ | ------ | ------ |
| FR-5.1 | The system should complete data loading and display within 3 seconds under normal conditions | From query submission to result display should not exceed 3 seconds under standard network conditions; if timeouts, errors signal will be displayed | Low |
| FR-5.2 | The system interface should be compatible with mobile and desktop devices | Normal display and functionality on both mobile devices and web browsers | Low |

### 6. Other Features

| Requirement ID | Description | Acceptance Criteria | Priority |
| ------ | ------ | ------ | ------ |
| FR-6.1 | Add different components based on information provided by the API | | Low |

## 5. Non-Functional Requirements

### 5.1 Performance

- Quick response to user queries
- Optimize API call frequency and data loading time

### 5.2 Usability

- Intuitive user interface design
- Responsive design for different screen sizes
- Clear error messages and user feedback

### 5.3 Maintainability

- Modular and structured code design
- Comprehensive documentation (including README and code comments)
- Testable code structure

### 5.4 Compatibility

- Support for mainstream browsers
- Responsive design for mobile devices

## 6. Data Flow

**6.1** User enters a postcode and submits the query

**6.2** Application validates the postcode format

**6.3** Application checks if data for that postcode exists in the cache

**6.4** If no cached data exists, application calls the Just Eat API

**6.5** Application extracts the four required fields from the API response

**6.6** Application processes and formats the data

**6.7** Application displays the results to the user

**6.8** User may choose to sort or filter the results

## 7. Limitations and Assumptions

### Limitations

- Only processes UK postcodes.
- What ever the search term is, only displays the top 10 restaurants.
- Only extracts four specific data points.
- API may have request rate limits or occasional unavailability.

### Assumptions

- Users have stable internet connections.
- API structure remains relatively stable during the project period.
- The number of restaurants may vary significantly between different postcodes.
- Users are primarily interested in basic restaurant information.

## 8.Testing Methods

1. Search online for any UK postcode of your choice  
2. Choose a postcode from the following list: EC4M 7RF to return restaurant data for that postcode.  

![image-20250403011947939](C:\Users\JSJ\AppData\Roaming\Typora\typora-user-images\image-20250403011947939.png)