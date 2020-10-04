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

    /* -------------------------------------------------------------------------------- */

    /* ==============================
        TEST API REQUESTS
    ============================== */
    suite('API', () => {
        /* INVALID URL */
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

        /* VALID URL */
        test('Valid URL, Posting with valid URL should be Ok', (done) => {
            request(app)
                .post('/api/url')
                .type('form')
                .send({
                    _methode: 'post',
                    url: 'https://www.npmjs.com/package/shortid',
                })
                .end((err, res) => {
                    // console.log(res.header)
                    assert.strictEqual(
                        res.status,
                        200,
                        'res.status should be 200'
                    )

                    assert.equal(
                        res.header['content-type'],
                        'text/html; charset=utf-8'
                    )
                    done()
                })
        })
    })
})
