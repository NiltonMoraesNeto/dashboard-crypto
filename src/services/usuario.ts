import api from "./api";

export const usuarioGet = async (email: string) => {
  try {
    const response = await api.get('/usuario', { params: { email } });
    if (response.data.length > 0) {
      const user = response.data[0];
      return user;
    }
    return false;
  } catch (error) {
    console.error('Erro ao consultar o usuário', error);
    return false;
  }
};

export const usuarioPut = async (id: string, usuarioData: object) => {
  try {
    const response = await api.put(`/usuario/${id}`, usuarioData);
    
    if (response.data) {
      return response;
    }
    return false;
  } catch (error) {
    console.error('Erro ao atualizar o usuário', error);
    return false;
  }
};

export const usuarioPost = async (usuarioData: object) => {
  try {
    const response = await api.post('/usuario', usuarioData);
    
    if (response.data) {
      return response
    }
    return false;
  } catch (error) {
    console.error('Erro ao adicionar o usuário', error);
    return false;
  }
};
