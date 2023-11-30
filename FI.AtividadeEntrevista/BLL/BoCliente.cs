using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FI.AtividadeEntrevista.BLL
{
    public class BoCliente
    {
        /// <summary>
        /// Inclui um novo cliente
        /// </summary>
        /// <param name="cliente">Objeto de cliente</param>
        public long Incluir(DML.Cliente cliente)
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
            var retorno = cli.Incluir(cliente);
            cliente.Beneficiarios.ForEach(x =>
            {
                x.IdCliente = retorno;
                IncluirBeneficiario(x);
            });
            return retorno;
        }

        /// <summary>
        /// Altera um cliente
        /// </summary>
        /// <param name="cliente">Objeto de cliente</param>
        public void Alterar(DML.Cliente cliente)
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
            cli.Alterar(cliente);
        }

        /// <summary>
        /// Consulta o cliente pelo id
        /// </summary>
        /// <param name="id">id do cliente</param>
        /// <returns></returns>
        public DML.Cliente Consultar(long id)
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
            return cli.Consultar(id);
        }

        /// <summary>
        /// Excluir o cliente pelo id
        /// </summary>
        /// <param name="id">id do cliente</param>
        /// <returns></returns>
        public void Excluir(long id)
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
            cli.Excluir(id);
        }

        /// <summary>
        /// Lista os clientes
        /// </summary>
        public List<DML.Cliente> Listar()
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
            return cli.Listar();
        }

        /// <summary>
        /// Lista os clientes
        /// </summary>
        public List<DML.Cliente> Pesquisa(int iniciarEm, int quantidade, string campoOrdenacao, bool crescente, out int qtd)
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
            return cli.Pesquisa(iniciarEm,  quantidade, campoOrdenacao, crescente, out qtd);
        }

        /// <summary>
        /// VerificaExistencia
        /// </summary>
        /// <param name="CPF"></param>
        /// <returns></returns>
        public bool VerificarExistencia(string CPF)
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
            return cli.VerificarExistencia(CPF);
        }

        #region Beneficiarios
        /// <summary>
        /// VerificaExistenciaBeneficiario
        /// </summary>
        /// <param name="CPFBeneficiario"></param>
        /// <param name="idCliente"></param>
        /// <returns></returns>
        public bool VerificaExistenciaBeneficiario(string CPFBeneficiario, int idCliente)
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
            return cli.VerificarExistenciaBeneficiario(CPFBeneficiario, idCliente);
        }

        /// <summary>
        /// Inclui um novo beneficiario
        /// </summary>
        /// <param name="beneficiario">Objeto de beneficiario</param>
        public long IncluirBeneficiario(DML.Beneficiario beneficiario)
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
            return cli.IncluirBeneficiario(beneficiario);
        }

        /// <summary>
        /// Altera um beneficiario
        /// </summary>
        /// <param name="beneficiario">Objeto de beneficiario</param>
        public void AlterarBeneficiario(DML.Beneficiario beneficiario)
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
            cli.AlterarBeneficiario(beneficiario);
        }

        public List<DML.Beneficiario> PesquisaBeneficiario(int iniciarEm, int quantidade, string campoOrdenacao, bool crescente, int idCliente, out int qtd)
        {
            DAL.DaoCliente cli = new DAL.DaoCliente();
            return cli.PesquisaBeneficiarios(iniciarEm, quantidade, campoOrdenacao, crescente, idCliente, out qtd);
        }

        #endregion
    }
}
