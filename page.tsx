'use client'

import { useState, useEffect } from 'react';

export default function CalculoLucro() {
  const [precoCombustivel, setPrecoCombustivel] = useState(0);
  const [valorVeiculo, setValorVeiculo] = useState(0);
  const [valorSeguro, setValorSeguro] = useState(0);
  const [valorManutencao, setValorManutencao] = useState(0);
  const [kmPorLitro, setKmPorLitro] = useState(0);
  const [kmsPorDia, setKmsPorDia] = useState(0);
  const [valorCorrida, setValorCorrida] = useState(0);
  const [kmsRodados, setKmsRodados] = useState(0);
  const [lucroCurtoPrazo, setLucroCurtoPrazo] = useState(null);
  const [lucroLongoPrazo, setLucroLongoPrazo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    calcularLucros();
  }, [precoCombustivel, valorVeiculo, valorSeguro, valorManutencao, kmPorLitro, kmsPorDia, valorCorrida, kmsRodados]);

  const calcularLucros = () => {
    if (!precoCombustivel || !valorVeiculo || !valorSeguro || !valorManutencao || !kmPorLitro || !kmsPorDia || !valorCorrida || !kmsRodados) {
      setLucroCurtoPrazo(null);
      setLucroLongoPrazo(null);
      return;
    }

    const custoCombustivelPorKm = precoCombustivel / kmPorLitro;
    const custoCombustivelCorrida = custoCombustivelPorKm * kmsRodados;
    const lucroCurto = valorCorrida - custoCombustivelCorrida;
    setLucroCurtoPrazo(lucroCurto);

    const custoManutencaoCorrida = ((valorManutencao + valorSeguro) || (0.03 * valorVeiculo)) * kmsRodados / (kmsPorDia * 252);
    const depreciaçãoVeiculo = (valorVeiculo * 0.03 * kmsRodados) / (kmsPorDia * 252);
    const lucroLongo = valorCorrida - custoCombustivelCorrida - custoManutencaoCorrida - depreciaçãoVeiculo;
    setLucroLongoPrazo(lucroLongo);
  };

  return (
    <div>
      <h1>Cálculo de Lucro</h1>
      <button onClick={() => setShowModal(true)}>Cadastrar Dados do Veículo</button>

      {showModal && (
        <div className="modal">
          <h2>Cadastro de Dados do Veículo</h2>
          <div>
            <label>Preço do Combustível (por litro):</label>
            <input type="number" value={precoCombustivel} onChange={(e) => setPrecoCombustivel(parseFloat(e.target.value) || 0)} required />
          </div>
          <div>
            <label>Valor do Veículo:</label>
            <input type="number" value={valorVeiculo} onChange={(e) => setValorVeiculo(parseFloat(e.target.value) || 0)} required />
          </div>
          <div>
            <label>Valor do Seguro (por ano):</label>
            <input type="number" value={valorSeguro} onChange={(e) => setValorSeguro(parseFloat(e.target.value) || 0)} required />
          </div>
          <div>
            <label>Valor de Manutenção (por ano):</label>
            <input type="number" value={valorManutencao} onChange={(e) => setValorManutencao(parseFloat(e.target.value) || 0)} required />
          </div>
          <div>
            <label>Km/L feitos pelo veículo:</label>
            <input type="number" value={kmPorLitro} onChange={(e) => setKmPorLitro(parseFloat(e.target.value) || 0)} required />
          </div>
          <div>
            <label>Kms rodados por dia:</label>
            <input type="number" value={kmsPorDia} onChange={(e) => setKmsPorDia(parseFloat(e.target.value) || 0)} required />
          </div>
          <button onClick={() => setShowModal(false)}>Salvar</button>
        </div>
      )}

      <div>
        <label>Valor da Corrida:</label>
        <input type="number" value={valorCorrida} onChange={(e) => setValorCorrida(parseFloat(e.target.value) || 0)} />
      </div>
      <div>
        <label>Quilômetros Rodados:</label>
        <input type="number" value={kmsRodados} onChange={(e) => setKmsRodados(parseFloat(e.target.value) || 0)} />
      </div>
      <button onClick={calcularLucros}>Calcular Lucros</button>

      <div>
        <label>Lucro de Curto Prazo:</label>
        <input type="text" value={lucroCurtoPrazo !== null ? `R$${lucroCurtoPrazo.toFixed(2)}` : ''} readOnly />
      </div>
      <div>
        <label>Lucro de Longo Prazo:</label>
        <input type="text" value={lucroLongoPrazo !== null ? `R$${lucroLongoPrazo.toFixed(2)}` : ''} readOnly />
      </div>
    </div>
  );
}
