module.exports = {
    baseUrl: 'http://localhost:3000/hw/store/',
    gridUrl: 'http://localhost:4444/wd/hub',

    sets: {
        tests: {
            files: 'test/hermione/*.hermione.js'
        }
    },

    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        }
    },

    plugins: {
        'html-reporter/hermione': {
            path: 'hermione-html-reporter'
        },
        'hermione-selenium-standalone-runner': true
    }
}