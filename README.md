Our group is you-are-right

our memebers are :

Siji Hua
Haimo Lu
Tianze Zha
Zeyu Cheng
Hexu Gao

We show the details of our tasks and design on the confluence, the link is 
https://2021-it-project-team-80.atlassian.net/wiki/spaces/HOME/pages


Mongodb uro is  'mongodb://127.0.0.1:27017/db' , when people want to test, they need to setup mongodb server, (need local database)

The live server link is : http://47.99.120.148:8888/index#/home
Now one people has already registered, and the username: ckzy0808@gmail.com and the password is : 1, you should log in directly, 
however, I still  suggest that client should start from registering, so that they can operate better.

And then people operate as a client, firstly they need to register an account, and then he will get access to login, and start using its functions.
The details of functions are described clearly on confluence as well.


**If marker want to download code from github, you need to need to download the document front-end  and back-end, then open these two 
folder on two windows, then use the command 'npm run serve' after npm intsall, http://localhost:8888/index, this website will run. I will update a 
compiled one later, so that you can just need run on one window.

The the commit ID of front-end part should be d31465169d5c915a0dff35856d4a0c17d6e753d9, the commit ID of back-end should be 48e542c0d4e059e81ae0d08654ddb312b74c028c

And there are something (problem which haven't be solved) I need to mention, and I will try to solve them gradually befor the final deadline or presentation:
1. the current home page do not have the adaptive function, it will be at the middle with % in css, if clients think it looks not good, try to stretch the window,
it will be better.
2. Now we can search the contact by keyword, and one of the types of keywords is company, originally in the design, we could add more companies, but now I change that 
client could only add one company. Maybe I could change this in the next few days.
3. When client firstly opens this address, maybe the register page will appear twice, then next time this problem will not appear.
4. events now is shown in row, I will change it in line later to compare the effect and decide which one is better



- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

Sprint2

I will submit three new file holders, front-end（Sprint2）, back-end（Sprint2） and Sprint2, and two test file holders.

First two file holders are front-end and back-end, you can use command "npm run build" then you can get a dis document and cpoy and paste into document of static in backend, 
and it will work. Or you can use "npm install" and "npm run serve " in the document of Sprint2 directly, then copy and paste the address "http://localhost:8888/index" in the browser.
It will work. 

The commit id for front-end is aed204ad7781a4b5c18cf6a8e47660a8ddeb3163, the back-end id is 105ad79577d6d914bddcace02b3d10f94f6cee75, 
and the sprint2 id is ef71494fe20f8c6756be944c2029fbb02ad93c63.


The live demo address is still http://47.99.120.148:8888/index#/home , you need to copy and paste into the address tab in the browser and the admin account is admin the password is 123456
Then we try to get workflow file holders, which could deploy and yml document could test automically， CI/CD does work.

Now we just currently fix some small bugs and set the correct format for the email and username, so the new email for admin is admin@root.com and the password is 123456

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

Final product
 
I have submitted three new file holders which are 'final product after compling(final version)', 'final product back end' and 'final product front-end',  
The commit id for them are 1c652f3544a3c94a9ef4f50c407f82d373fa0642, 6e8d263e4ecdad1a62733495a1af5de7311115c6 and 98d262faa4c7d37774b4671ee704c65a3969bc93. 
For the marker, there are two methods for them to test:

1. download the front end and back end, and then in the front end, type the command 'npm install' and then npm run serve, and then open the file of back end on a new window and then run the 
command 'npm install' and npm run serve again, and then enter the address http://localhost:8888/index in the browser. And in the front end, we have try some testing code for
the component render correctly.

2. I have already compile by run the command 'npm i' , 'npm run build' to get a dist file and then add to the back-end, to get the final version file holder, you can open this on a window, 
and the run the command 'npm install' and 'npm run serve' directly, and then type the address in the browser. 

For both of above methods, we need to download the mongodbcompass on our device, then we could check the data on the local database.

We have already depolyed on the Ali cloud, and the live demo is http://47.99.120.148:8888/index#/home, however according to the superviser suggestios, we just rent the server for two months, the expire date 
is the end of the November.  And on the github, we try a test of CI/CD, which could deploy or test automatically if we upload some new files.

We have predefined an adminostrator account- the email is admin@root.com and the password is 123456, as an administrator, we could manage the all clients' accounts and help them change the password 
, reset the password and delete the account(if the client does not want to use this account any more).  And we could also predefine the tags and titles which will be used when the client wants to add the new contact.

And there are some small tips:
1. According to the requirements, we could add maximum 10 favourite contacts.
2. According to the requirements, it will only save the latest four events.
3. For function of calendar, when we create event, when we set start time, you'd better set start date and end date on the same day, and for the exact time, we'd better set it
from 12:00m and 20:00pm, because there is a problem caused by the time difference in the different region, if you could change the region on your device into Chinese, you could set any time,
they will be shown on the calendar, correctly.  

