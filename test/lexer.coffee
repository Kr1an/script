lex = require '../src/core/lexer'
{
  VARIABLE,
  NUMBER,
  STRING,
  EMPTY,
  RESERVED,
} = require '../src/core/lexer/types'

{
  PARSE_ERROR
} = require '../src/core/lexer/error'

describe 'lexer', ->
  it 'should return correct tokens array with easy expression', ->
    lex('VAR1 = 1 + 2')
      .should.eql [
        { content: 'VAR1', type: VARIABLE },
        { content: ' ', type: EMPTY },
        { content: '=', type: RESERVED },
        { content: ' ', type: EMPTY },
        { content: '1', type: NUMBER },
        { content: ' ', type: EMPTY },
        { content: '+', type: RESERVED },
        { content: ' ', type: EMPTY },
        { content: '2', type: NUMBER },
      ]
  it 'should return correct tokens array with difficult expression', ->
    lex("a = (43^3) + b - asd+'testString'")
      .should.eql [
        { content: 'a', type: VARIABLE },
        { content: ' ', type: EMPTY },
        { content: '=', type: RESERVED },
        { content: ' ', type: EMPTY },
        { content: '(', type: RESERVED },
        { content: '43', type: NUMBER },
        { content: '^', type: RESERVED },
        { content: '3', type: NUMBER },
        { content: ')', type: RESERVED },
        { content: ' ', type: EMPTY },
        { content: '+', type: RESERVED },
        { content: ' ', type: EMPTY },
        { content: 'b', type: VARIABLE },
        { content: ' ', type: EMPTY },
        { content: '-', type: RESERVED },
        { content: ' ', type: EMPTY },
        { content: 'asd', type: VARIABLE },
        { content: '+', type: RESERVED },
        { content: 'testString', type: STRING },


      ]
  it 'should throw Parse Error', ->
    code = '$ = 1 + 3'
    try
      lex code
    catch e
      e.should.have.properties {
        type: PARSE_ERROR,
        payload: {
          code
          position: 0
        }
      }
