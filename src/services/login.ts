import api from "./api";
import bcrypt from 'bcryptjs'

export const login = async (email: string, password: string) => {
  try {
    // Fazendo a requisição GET para obter o usuário com o email
    const response = await api.get('/users', { params: { email } });
    
    if (response.data.length > 0) {
      const user = response.data[0]; // Pega o primeiro usuário encontrado
      const hash = user.password;  // O hash da senha armazenado

      // Compara a senha fornecida com o hash armazenado
      if (bcrypt.compareSync(password, hash)) {
        // Se as senhas coincidirem, faz o login
        localStorage.setItem('token', 'fake-jwt-token');
        localStorage.setItem('user', JSON.stringify(user));
        return true;
      } else {
        return false;  // Se as senhas não coincidirem
      }
    }

    return false;  // Se o usuário não for encontrado
  } catch (error) {
    console.error('Erro ao fazer login', error);
    return false;
  }
};

export const createLogin = async (email: string, password: string) => {
  try {
    // Gerar um salt para o bcryptjs
    const salt = bcrypt.genSaltSync(10); 
    // Gerar o hash da senha usando o salt
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Criar o objeto do usuário com o email e o hash da senha
    const user = { email, password: hashedPassword };

    // Enviar o objeto para a API (JSON Server) via POST
    const response = await api.post('/users', user);
    console.log('Usuário criado com sucesso:', response.data);

    return response;
  } catch (error) {
    console.error('Erro ao criar usuário', error);
    return false;
  }
};

export const updatePassword = async (userId: string, newPassword: string) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);

    const user = { password: hashedPassword };

    const response = await api.patch(`/users/${userId}`, user);

    return response;
  } catch (error) {
    console.error('Erro ao atualizar senha', error);
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const verifyAuth = () => {
  return !!localStorage.getItem('token');
};