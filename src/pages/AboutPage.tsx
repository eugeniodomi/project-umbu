import React, { useState } from 'react';
import { Button } from '../components/ui/Button';

export const AboutPage: React.FC = () => {
  const [mostrarProjeto, setMostrarProjeto] = useState(false);

  return (
    <div className="page-container fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', textAlign: 'center' }}>
        {mostrarProjeto ? 'Sobre o Projeto' : 'Sobre Nós'}
      </h2>

      <div className="card" style={{ marginBottom: '2rem', padding: '2rem' }}>
        {!mostrarProjeto ? (
          <div className="fade-in">
            <h3 style={{ color: 'var(--color-text-main)', marginBottom: '1rem' }}>Nossa Missão</h3>
            <p style={{ lineHeight: '1.6', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
              A <strong>Raízes do Nordeste</strong> nasceu com o propósito de levar o verdadeiro sabor da culinária nordestina para todos os cantos do país. 
              Nosso compromisso é com a qualidade excepcional dos ingredientes, o respeito às tradições regionais e um atendimento padronizado 
              que acolhe cada cliente como se estivesse em casa.
            </p>
            <p style={{ lineHeight: '1.6', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
              Cada prato é preparado com carinho e dedicação, garantindo que a riqueza dos temperos e a autenticidade das receitas sejam 
              preservadas. Trabalhamos para criar uma experiência gastronômica memorável, onde quer que você esteja.
            </p>
          </div>
        ) : (
          <div className="fade-in">
            <h3 style={{ color: 'var(--color-text-main)', marginBottom: '1rem' }}>Quebrando a Quarta Parede</h3>
            <p style={{ lineHeight: '1.6', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
              Este sistema é uma aplicação fictícia desenvolvida por <strong>Eugênio Domingues</strong> como parte dos requisitos 
              para a disciplina de <strong>Projeto Multidisciplinar</strong> da instituição <strong>UNINTER</strong>.
            </p>
            <p style={{ lineHeight: '1.6', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
              O foco principal deste desenvolvimento está na <strong>Qualidade de Software (QA)</strong>, aplicando boas práticas de 
              arquitetura, testes e usabilidade no ecossistema front-end. Toda a interface, navegação e gerenciamento de estado foram 
              construídos para demonstrar competências técnicas essenciais na área de engenharia de software.
            </p>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          <Button 
            onClick={() => setMostrarProjeto(!mostrarProjeto)}
            style={{ padding: '0.8rem 1.5rem', fontSize: '1rem' }}
          >
            {mostrarProjeto ? 'Voltar para a visão da franquia 🌵' : 'Ver sobre o desenvolvimento do projeto 👨💻'}
          </Button>
        </div>
      </div>
    </div>
  );
};
