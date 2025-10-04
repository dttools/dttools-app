-- Script para criar conteúdo inicial da Central de Ajuda
-- Execute este script no seu banco PostgreSQL ou use o painel admin

-- Inserir Categorias
INSERT INTO help_categories (name, slug, description, icon, "order", published) VALUES
('Primeiros Passos', 'primeiros-passos', 'Tudo que você precisa saber para começar a usar o Design Thinking Tools', 'PlayCircle', 1, true),
('Design Thinking', 'design-thinking', 'Guias completos sobre metodologia e ferramentas de Design Thinking', 'Lightbulb', 2, true),
('Ferramentas', 'ferramentas', 'Como usar cada ferramenta disponível na plataforma', 'Settings', 3, true),
('Perguntas Frequentes', 'faq', 'Respostas para as dúvidas mais comuns dos usuários', 'HelpCircle', 4, true),
('Problemas Técnicos', 'problemas-tecnicos', 'Soluções para problemas técnicos e erros comuns', 'AlertTriangle', 5, true);

-- Inserir Artigos (assumindo que as categorias foram criadas)
-- Categoria: Primeiros Passos
INSERT INTO help_articles (title, slug, content, excerpt, category_id, author, tags, "order", published, featured) VALUES
(
  'Bem-vindo ao Design Thinking Tools',
  'bem-vindo',
  '<h2>Seja bem-vindo ao Design Thinking Tools!</h2>
  <p>Parabéns por dar o primeiro passo na sua jornada de inovação! O Design Thinking Tools é uma plataforma completa que vai te ajudar a aplicar a metodologia de Design Thinking de forma estruturada e eficiente.</p>
  
  <h3>O que você pode fazer aqui:</h3>
  <ul>
    <li><strong>Criar projetos</strong> organizados por fases do Design Thinking</li>
    <li><strong>Usar ferramentas especializadas</strong> para cada etapa do processo</li>
    <li><strong>Colaborar com sua equipe</strong> de forma integrada</li>
    <li><strong>Acompanhar o progresso</strong> dos seus projetos</li>
    <li><strong>Gerar insights</strong> com inteligência artificial</li>
  </ul>
  
  <h3>Próximos passos:</h3>
  <ol>
    <li>Complete seu perfil na área de configurações</li>
    <li>Crie seu primeiro projeto</li>
    <li>Explore as ferramentas disponíveis</li>
    <li>Convide sua equipe para colaborar</li>
  </ol>
  
  <p><strong>Dica:</strong> Comece com um projeto pequeno para se familiarizar com a plataforma!</p>',
  'Guia de boas-vindas para novos usuários da plataforma Design Thinking Tools',
  (SELECT id FROM help_categories WHERE slug = 'primeiros-passos'),
  'Equipe DT Tools',
  '["boas-vindas", "tutorial", "início"]',
  1,
  true,
  true
),
(
  'Como criar seu primeiro projeto',
  'criar-primeiro-projeto',
  '<h2>Criando seu primeiro projeto</h2>
  <p>Criar um projeto no Design Thinking Tools é simples e intuitivo. Siga este passo a passo:</p>
  
  <h3>Passo 1: Acessar a área de projetos</h3>
  <p>No dashboard principal, clique no botão <strong>"Novo Projeto"</strong> ou acesse a seção "Projetos" no menu.</p>
  
  <h3>Passo 2: Definir informações básicas</h3>
  <ul>
    <li><strong>Nome do projeto:</strong> Escolha um nome claro e descritivo</li>
    <li><strong>Descrição:</strong> Explique brevemente o objetivo do projeto</li>
    <li><strong>Fase inicial:</strong> Geralmente começamos pela fase "Empatizar"</li>
  </ul>
  
  <h3>Passo 3: Configurar a equipe</h3>
  <p>Você pode convidar colaboradores ou começar trabalhando sozinho e adicionar pessoas depois.</p>
  
  <h3>Passo 4: Começar a trabalhar</h3>
  <p>Com o projeto criado, você terá acesso a todas as ferramentas organizadas por fase do Design Thinking.</p>
  
  <h3>Dicas importantes:</h3>
  <ul>
    <li>Defina um problema claro antes de começar</li>
    <li>Não tenha pressa - cada fase tem seu tempo</li>
    <li>Use as ferramentas sugeridas para cada etapa</li>
    <li>Documente tudo - isso será valioso mais tarde</li>
  </ul>',
  'Tutorial passo a passo para criar e configurar seu primeiro projeto na plataforma',
  (SELECT id FROM help_categories WHERE slug = 'primeiros-passos'),
  'Equipe DT Tools',
  '["projeto", "tutorial", "criação"]',
  2,
  true,
  false
);

-- Categoria: Design Thinking
INSERT INTO help_articles (title, slug, content, excerpt, category_id, author, tags, "order", published, featured) VALUES
(
  'O que é Design Thinking?',
  'o-que-e-design-thinking',
  '<h2>Design Thinking: Uma abordagem centrada no ser humano</h2>
  <p>Design Thinking é uma metodologia de inovação centrada no ser humano que integra as necessidades das pessoas, as possibilidades da tecnologia e os requisitos para o sucesso dos negócios.</p>
  
  <h3>Os 5 pilares do Design Thinking:</h3>
  
  <h4>1. 🤝 Empatizar</h4>
  <p>Compreenda profundamente as necessidades, pensamentos, emoções e motivações das pessoas envolvidas.</p>
  
  <h4>2. 🎯 Definir</h4>
  <p>Sintetize suas observações em uma definição clara do problema central.</p>
  
  <h4>3. 💡 Idear</h4>
  <p>Gere uma ampla gama de ideias criativas e inovadoras.</p>
  
  <h4>4. 🛠️ Prototipar</h4>
  <p>Transforme ideias em produtos tangíveis para investigar soluções.</p>
  
  <h4>5. 🧪 Testar</h4>
  <p>Teste protótipos com usuários e use feedback para refinar soluções.</p>
  
  <h3>Por que usar Design Thinking?</h3>
  <ul>
    <li><strong>Foco no usuário:</strong> Soluções realmente úteis</li>
    <li><strong>Redução de riscos:</strong> Teste antes de investir muito</li>
    <li><strong>Inovação:</strong> Abordagem criativa para problemas complexos</li>
    <li><strong>Colaboração:</strong> Envolve diferentes perspectivas</li>
    <li><strong>Agilidade:</strong> Iteração rápida e melhoria contínua</li>
  </ul>',
  'Introdução completa à metodologia Design Thinking e seus cinco estágios principais',
  (SELECT id FROM help_categories WHERE slug = 'design-thinking'),
  'Equipe DT Tools',
  '["metodologia", "conceitos", "fundamentos"]',
  1,
  true,
  true
),
(
  'Fase 1: Como Empatizar efetivamente',
  'fase-empatizar',
  '<h2>Empatizar: O coração do Design Thinking</h2>
  <p>A fase de Empatizar é onde tudo começa. É o momento de entender profundamente as pessoas para quem você está projetando.</p>
  
  <h3>Ferramentas disponíveis na plataforma:</h3>
  
  <h4>🗺️ Mapas de Empatia</h4>
  <p>Visualize o que seu usuário pensa, sente, vê, fala e faz. Uma ferramenta poderosa para organizar insights sobre comportamento.</p>
  
  <h4>👤 Personas</h4>
  <p>Crie representações fictícias dos seus usuários baseadas em dados reais. Dê nome, rosto e história para quem você está ajudando.</p>
  
  <h4>🎤 Entrevistas</h4>
  <p>Documente conversas estruturadas com usuários reais. Capture não apenas o que dizem, mas como dizem.</p>
  
  <h4>👀 Observações de Campo</h4>
  <p>Registre comportamentos naturais dos usuários em seu ambiente real. O que eles fazem quando ninguém está perguntando?</p>
  
  <h3>Dicas para uma empatia efetiva:</h3>
  <ul>
    <li><strong>Ouça mais do que fala:</strong> Deixe o usuário contar sua história</li>
    <li><strong>Faça perguntas abertas:</strong> "Como você se sente quando..." ao invés de "Você gosta de..."</li>
    <li><strong>Observe linguagem corporal:</strong> O que não está sendo dito?</li>
    <li><strong>Suspenda julgamentos:</strong> Entenda antes de avaliar</li>
    <li><strong>Busque emoções:</strong> Sentimentos revelam necessidades profundas</li>
  </ul>
  
  <h3>Resultado esperado:</h3>
  <p>Ao final desta fase, você deve ter uma compreensão rica e nuançada dos seus usuários, suas necessidades, frustrações e motivações.</p>',
  'Guia completo sobre a primeira fase do Design Thinking: como desenvolver empatia com seus usuários',
  (SELECT id FROM help_categories WHERE slug = 'design-thinking'),
  'Equipe DT Tools',
  '["empatizar", "usuários", "pesquisa"]',
  2,
  true,
  false
);

-- Categoria: Ferramentas
INSERT INTO help_articles (title, slug, content, excerpt, category_id, author, tags, "order", published, featured) VALUES
(
  'Como usar Mapas de Empatia',
  'mapas-empatia-tutorial',
  '<h2>Mapas de Empatia: Visualizando a experiência do usuário</h2>
  <p>Os Mapas de Empatia são uma ferramenta visual poderosa para organizar e sintetizar observações sobre usuários.</p>
  
  <h3>Estrutura do Mapa de Empatia:</h3>
  
  <h4>🗣️ O que DIZ</h4>
  <p>Frases e palavras-chave que o usuário expressa verbalmente. Citações diretas são muito valiosas.</p>
  <p><em>Exemplo: "Eu sempre esqueço de fazer backup dos meus arquivos"</em></p>
  
  <h4>🧠 O que PENSA</h4>
  <p>Pensamentos, crenças, preocupações que podem não ser expressos diretamente.</p>
  <p><em>Exemplo: "Será que meus dados estão seguros na nuvem?"</em></p>
  
  <h4>👀 O que VÊ</h4>
  <p>O ambiente, pessoas, situações que influenciam o comportamento do usuário.</p>
  <p><em>Exemplo: "Colegas perdendo trabalho por falhas técnicas"</em></p>
  
  <h4>🏃 O que FAZ</h4>
  <p>Ações e comportamentos observáveis do usuário.</p>
  <p><em>Exemplo: "Salva arquivos em múltiplos locais por precaução"</em></p>
  
  <h4>😰 DORES</h4>
  <p>Frustrações, medos, obstáculos que o usuário enfrenta.</p>
  <p><em>Exemplo: "Medo de perder trabalho importante"</em></p>
  
  <h4>🎯 GANHOS</h4>
  <p>Necessidades, desejos, objetivos e medidas de sucesso.</p>
  <p><em>Exemplo: "Ter certeza de que dados estão sempre acessíveis"</em></p>
  
  <h3>Como criar na plataforma:</h3>
  <ol>
    <li>Acesse seu projeto e vá para a fase "Empatizar"</li>
    <li>Clique em "Novo Mapa de Empatia"</li>
    <li>Dê um título descritivo (ex: "João - Freelancer Designer")</li>
    <li>Preencha cada seção com base em suas pesquisas</li>
    <li>Use frases curtas e específicas</li>
    <li>Salve e compartilhe com sua equipe</li>
  </ol>',
  'Tutorial completo sobre como criar e usar Mapas de Empatia para entender melhor seus usuários',
  (SELECT id FROM help_categories WHERE slug = 'ferramentas'),
  'Equipe DT Tools',
  '["mapa-empatia", "ferramenta", "usuários"]',
  1,
  true,
  false
);

-- Categoria: FAQ
INSERT INTO help_articles (title, slug, content, excerpt, category_id, author, tags, "order", published, featured) VALUES
(
  'Perguntas Frequentes Gerais',
  'faq-geral',
  '<h2>Perguntas Frequentes</h2>
  
  <h3>💰 Quanto custa usar a plataforma?</h3>
  <p>Oferecemos diferentes planos para atender suas necessidades. Temos um plano gratuito para começar e planos pagos com recursos avançados. Confira nossa página de preços para detalhes atualizados.</p>
  
  <h3>👥 Posso colaborar com minha equipe?</h3>
  <p>Sim! A colaboração é uma das principais funcionalidades da plataforma. Você pode convidar membros da equipe, atribuir tarefas e trabalhar juntos em tempo real nos projetos.</p>
  
  <h3>💾 Meus dados estão seguros?</h3>
  <p>Absolutamente. Usamos criptografia de ponta e seguimos as melhores práticas de segurança. Seus dados são armazenados em servidores seguros e fazemos backups regulares.</p>
  
  <h3>📱 Posso usar no celular?</h3>
  <p>Sim! Nossa plataforma é responsiva e funciona perfeitamente em dispositivos móveis. Você pode acessar seus projetos de qualquer lugar.</p>
  
  <h3>🤖 Como funciona a IA da plataforma?</h3>
  <p>Nossa inteligência artificial analisa seus projetos e oferece insights, sugestões e orientações personalizadas para cada fase do Design Thinking. Ela aprende com suas práticas e melhora suas recomendações.</p>
  
  <h3>📚 Vocês oferecem treinamento?</h3>
  <p>Sim! Além desta central de ajuda, oferecemos webinars, tutoriais em vídeo e consultoria especializada. Entre em contato conosco para saber mais sobre nossos programas de treinamento.</p>
  
  <h3>🔄 Posso exportar meus dados?</h3>
  <p>Claro! Você pode exportar seus projetos em diversos formatos (PDF, Excel, etc.) a qualquer momento. Seus dados são seus e você tem total controle sobre eles.</p>
  
  <h3>❓ E se eu tiver outras dúvidas?</h3>
  <p>Estamos aqui para ajudar! Use esta central de ajuda, envie um email para suporte@dttools.app ou use o chat ao vivo na plataforma.</p>',
  'Respostas para as perguntas mais comuns sobre a plataforma Design Thinking Tools',
  (SELECT id FROM help_categories WHERE slug = 'faq'),
  'Equipe DT Tools',
  '["faq", "dúvidas", "suporte"]',
  1,
  true,
  true
);

-- Categoria: Problemas Técnicos
INSERT INTO help_articles (title, slug, content, excerpt, category_id, author, tags, "order", published, featured) VALUES
(
  'Problemas de Login e Acesso',
  'problemas-login',
  '<h2>Solucionando Problemas de Login</h2>
  
  <h3>🔐 Esqueci minha senha</h3>
  <p>Se você esqueceu sua senha:</p>
  <ol>
    <li>Vá para a página de login</li>
    <li>Clique em "Esqueci minha senha"</li>
    <li>Digite seu email cadastrado</li>
    <li>Verifique sua caixa de entrada (e spam)</li>
    <li>Siga as instruções no email recebido</li>
  </ol>
  
  <h3>📧 Não consigo receber emails</h3>
  <p>Se não está recebendo nossos emails:</p>
  <ul>
    <li>Verifique sua pasta de spam/lixo eletrônico</li>
    <li>Adicione noreply@dttools.app aos seus contatos</li>
    <li>Verifique se o email está correto no seu perfil</li>
    <li>Entre em contato conosco se o problema persistir</li>
  </ul>
  
  <h3>🌐 Problemas de carregamento</h3>
  <p>Se a plataforma não carrega corretamente:</p>
  <ul>
    <li>Limpe o cache do seu navegador</li>
    <li>Desative extensões do navegador temporariamente</li>
    <li>Tente usar modo anônimo/privado</li>
    <li>Verifique sua conexão com a internet</li>
    <li>Tente um navegador diferente</li>
  </ul>
  
  <h3>🔄 Sessão expirando rapidamente</h3>
  <p>Se você é deslogado frequentemente:</p>
  <ul>
    <li>Verifique se os cookies estão habilitados</li>
    <li>Não use múltiplas abas da plataforma simultaneamente</li>
    <li>Evite usar modo anônimo para trabalho regular</li>
  </ul>
  
  <h3>📞 Ainda precisa de ajuda?</h3>
  <p>Se nenhuma dessas soluções funcionou, entre em contato conosco com as seguintes informações:</p>
  <ul>
    <li>Seu navegador e versão</li>
    <li>Sistema operacional</li>
    <li>Descrição detalhada do problema</li>
    <li>Quando o problema começou</li>
  </ul>',
  'Soluções para os problemas mais comuns de login e acesso à plataforma',
  (SELECT id FROM help_categories WHERE slug = 'problemas-tecnicos'),
  'Equipe DT Tools',
  '["login", "acesso", "problemas", "suporte"]',
  1,
  true,
  false
);