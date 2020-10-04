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

    // api
    suite('API', () => {
        test('Ivalid URL, Posting an invalid URL should responde with error', (done) => {
            request(app)
                .post('/api/url')
                .type('form')
                .send({
                    _methode: 'post',
                    url: 'none-url-string',
                })
                .end((err, res) => {
                    assert.equal(res.status, 401, 'res.status should be 401')
                    assert.equal(res.text, 'This is not avalid url')
                    done()
                })
        })
    })
})
