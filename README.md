# catniper-app
Cat gallery from homework





## Running Locally

Catniper is built on React Native and therefore assumes you have [node](https://nodejs.org/en/) installed and [npm](https://www.npmjs.com/).

```sh
# clone the project and cd into it
git clone https://github.com/Simofy/catniper-app.git; 
cd ./catniper-app

# install dependencies
npm install

# start development environment
npm start
```

[Download .apk file](https://www.dropbox.com/s/h2tu1wqa7k9vo1s/work-signed.apk?dl=0)

<img src="https://i.imgur.com/zo01RTV.gif" alt="Catniper screenshot" />

## Homework:

**1. Create a mobile application with react-native framework, application should**:

```diff
+ Have two routes (they are usually called views or screens in iOS)
+ Primary route (view) should be a list view in which all kittens should be displayed
+ Secondary route (view) should be kitten info view
+ List should display random kitten images with randomly generated names
+ User should be able to specify count of displayed kitten items
```
**1.	Image app functionality**:
```diff
+	RN application should have basic navigation (from List view to Kitten view and back).
+	App should have a filter popup which allows user to specify how many items to show using placekitten.com API (30/50/100).
+ On application startup all images should be retrieved form API and each kitten should be assigned with randomly retrieved name from names array.
+	Application should show some sort of progress (loading) indicator while images are being fetched.
+	In Kitten view application should render kitten image at the top followed by it’s name and display kitten description below (Lorem Ipsum).
+	In List view application should render all kittens as list items.
+	If there are no internet connection user should see message with relevant information (it could be modal popup or text element in empty kitten list), for example “Couldn't connect to the internet”.
```
**1.	Bonus tasks:**
```diff
+	Allow user to specify count of items to retrieve
+	Generate signed .apk file, release version
-	Write tests for chosen react-native component
+	Store kitten data in app redux state
+	When all data is fetched for the first time store data in AsyncStorage, to allow user to review kittens when offline
```
