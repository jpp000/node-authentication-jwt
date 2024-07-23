import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const registerUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name) return res.status(422).json({ msg: "O nome é obrigatório!" });
  if (!email) return res.status(422).json({ msg: "O email é obrigatório!" });
  if (!password) return res.status(422).json({ msg: "A senha é obrigatória!" });
  if (password !== confirmPassword) return res.status(422).json({ msg: "As senhas não conferem!" });

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(422).json({ msg: "Por favor, utilize outro e-mail!" });

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({ name, email, password: hashedPassword });

  try {
    await user.save();
    res.status(201).json({ msg: "Usuário criado com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no Servidor Interno" });
    console.log(error);
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(422).json({ msg: "O email é obrigatório!" });
  if (!password) return res.status(422).json({ msg: "A senha é obrigatória!" });

  const user = await User.findOne({ email });
  if (!user) return res.status(422).json({ msg: "Usuário não cadastrado!" });

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) return res.status(422).json({ msg: "Senha inválida!" });

  try {
    const secret = process.env.SECRET;
    const token = jwt.sign({ id: user._id }, secret);

    res.status(200).json({ msg: "Autenticação realizada com sucesso!", token });
  } catch (error) {
    res.status(500).json({ msg: "Erro no Servidor Interno" });
    console.log(error);
  }
};
