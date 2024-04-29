<div align="center">

<h3 align="center">Wellness Platform 2 Server</h3>

  <p align="center">
    This repository has the server source code for the Wellness Platform 2 for Sleep Science. It contains end-points that interacts with the front-end and processes data.
  </p>
</div>

### Built With

* [Node.js](https://nodejs.dev/)
* [Typescript](https://www.typescriptlang.org/)
* [npm](https://docs.npmjs.com/)
* [Express](https://expressjs.com/)
* [Mongoose](https://mongoosejs.com/)
* [JsonWebToken](https://github.com/auth0/node-jsonwebtoken)
* [Bcrypt](https://www.npmjs.com/package/bcrypt)

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

* Node.js
* npm
  ```sh
  npm install npm@latest -g
  ```
* Typescript
  ```sh
  npm install typescript -g
  ```
  
### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/sleepscience/Server.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
4. Create an .env file `.env` in the root folder and add you secret keys
   ```js
   PORT = 9000
   DATABASE_URL = 'mongodb....'
   ```
   
### How To Run

Development local server (typescript files): 
```sh
npm run dev
```

Build .js Files: 
```sh
npm run build
```

Run .js Files: 
```sh
npm run start
```

<!-- CONTRIBUTING -->
## Contributing

When making changes, follow the steps:

1. Create your Feature Branch (`git checkout -b <name>/<feature>`)
2. Track Files (`git add . `)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin <name>/<feature>`)
5. Open a Pull Request

### Pull Updates From Remote Master:

1. Go to your branch on your local machine
  ```sh
  git checkout <name>/<feature>
  ```
2. Pull updates from remote master to YOUR local branch:
```sh
git pull origin master
```

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
<!-- [contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png -->
