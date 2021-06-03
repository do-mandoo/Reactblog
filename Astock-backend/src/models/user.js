import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema({
  username: String,
  hashedPassword: String
});

// 인스턴스 메서드 작성할 때는 화살표 함수가 아닌, function키워드를 사용해서 구현해야 한다.
// 함수 내부에서 this에 접근해야하기 때문이다. 여기서 this는 문서 인스턴스를 가리킨다.
// 인스턴스 메서드 만들기 1. setPassword
// : 이 메서드를 통해 비밀번호를 파라미터로 받아서 계정의 hashedPassword값을 설정해 줌.
UserSchema.methods.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash;
};

// 인스턴스 메서드 만들기 2. checkPassword
// : 파라미터로 받은 비밀번호가 해당 계정의 비밀번호와 일치하는지 검증해 줌.
UserSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result; // true/false
};

// 스태틱 메서드 만들기 findByUsername
// 스태틱함수에서의 this는 모델을 가리킨다. 그러니까 지금 여기서는 User를 가리겠쥬?ㅎ
UserSchema.statics.findByUsername = function (username) {
  return this.findOne({ username });
};

// serialize
UserSchema.methods.serialize = function () {
  // 응답할 데이터에서 hashedPassword 필드 제거
  const data = this.toJSON();
  delete data.hashedPassword;
  return data;
};

// generateToken인스턴스 메서드 만들기.
UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    // 첫 번째 파라미터에는 토큰 안에 집어넣고 싶은 데이터를 넣습니다.
    {
      _id: this.id,
      username: this.username
    },
    process.env.JWT_SECRET, // 두 번째 파라미터에는 JWT 암호를 넣습니다.
    {
      expiresIn: '7d' // 7일 동안 유효함.
    }
  );
  return token;
};

const User = mongoose.model('User', UserSchema);
export default User;
