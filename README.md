# khoway-backend

Send me a letter to postal code 05251 ✉️

# Credentails

### Smart Things Hub

- `159.65.140.255`
- `root` / `yaVAp4BUy-XSfDZ`

### Mail Service

- `t.unlocksth@gmail.com` / `Mbd299m5Be7MsKdd`

### SSH-KEYGEN

- `ssh-keygen -t rsa -C "waiphyoenaing.joy007@gmail.com"`
- `git clone git@github.com:unlocksth/khoway-backend.git`

### PM2 Start

- `pm2 start bin/www --name khoway-backend`

### UFW Config

- `sudo ufw allow from 159.65.140.255 to any port 5000`

### Set up Nginx

- `sudo apt install nginx`
- `sudo nano /etc/nginx/sites-available/domainname.com`
- `sudo ln -s /etc/nginx/sites-available/domainname.com /etc/nginx/sites-enabled/domainname.com`

### Mongo with Auth

- `mongo -u AdminSmartThingsHub -p --authenticationDatabase admin`
- `9AZZ44DM1N$MART285`

### MySql with Auth

- `mysql -u root -p`
- `9@ZZ44DM1N$MART267`

### Removal Course Menu

```
{
    "menuid": "courseMenu",
    "url": "#",
    "title": "Course",
    "icon": "fa fa-folder",
    "access": false,
    "active": false,
    "submenu": [
      {
        "menuid": "teacherSubMenu",
        "url": "/teachers",
        "title": "Teacher",
        "icon": "fa fa-list",
        "access": false,
        "active": false,
        "list": {
          "url": "/teachers",
          "title": "Teacher List",
          "breadcrumb": [
            {
              "url": "",
              "text": "Teacher List"
            }
          ]
        },
        "entry": {
          "url": "/teacher",
          "title": "Teacher Entry",
          "breadcrumb": [
            {
              "url": "/teachers",
              "text": "Teacher List"
            },
            {
              "url": "",
              "text": "Teacher Entry"
            }
          ]
        },
        "actions": "1,1,1"
      },
      {
        "menuid": "studentSubMenu",
        "url": "/students",
        "title": "Student",
        "icon": "fa fa-list",
        "access": false,
        "active": false,
        "list": {
          "url": "/students",
          "title": "Student List",
          "breadcrumb": [
            {
              "url": "",
              "text": "Student List"
            }
          ]
        },
        "entry": {
          "url": "/student",
          "title": "Student Entry",
          "breadcrumb": [
            {
              "url": "/students",
              "text": "Student List"
            },
            {
              "url": "",
              "text": "Student Entry"
            }
          ]
        },
        "actions": "1,1,1"
      }
    ]
  }
```
