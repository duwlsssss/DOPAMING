module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended', // Prettier와 코드 포맷팅 통합
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',        
  },
  plugins: ['eslint-plugin-prettier'],
  rules: {
    'prettier/prettier': 'error',
    'eqeqeq': 'error', // 일치 연산자 사용 필수
    'dot-notation': 'warn', // 가능하다면 dot notation 사용 .점표기법 ex) 선호:obj.name 비선호:obj[name]
    'no-unused-vars': 'error', // 사용하지 않는 변수 금지
  },
};