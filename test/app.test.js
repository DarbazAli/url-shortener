import mocha from 'mocha'
import chai from 'chai'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)

const { assert, request } = chai
const { test, suite } = mocha

import app from '../app.js'

suite('HTTP METHODES', () => {
    suite('HOME (/)', () => {
        test('GET /, response status should be 200', (done) => {
            request(app)
                .get('/')
                .end((err, res) => {
                    assert.equal(
                        res.status,
                        200,
                        'response status should be 200'
                    )
                    done()
                })
        })
    })
})
