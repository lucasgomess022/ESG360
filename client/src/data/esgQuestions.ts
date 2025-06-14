export interface ESGQuestion {
  id: number;
  dimension: 'environmental' | 'social' | 'governance';
  text: string;
}

export const esgQuestions: ESGQuestion[] = [
  // Environmental Questions (1-25)
  { id: 1, dimension: 'environmental', text: 'A propriedade possui sistema de gestão de resíduos sólidos implementado?' },
  { id: 2, dimension: 'environmental', text: 'Existe controle do uso de agrotóxicos e fertilizantes na propriedade?' },
  { id: 3, dimension: 'environmental', text: 'A propriedade realiza manejo sustentável das pastagens?' },
  { id: 4, dimension: 'environmental', text: 'Há sistema de captação e tratamento de água na propriedade?' },
  { id: 5, dimension: 'environmental', text: 'A propriedade possui áreas de preservação permanente (APP) demarcadas?' },
  { id: 6, dimension: 'environmental', text: 'Existe monitoramento da qualidade da água utilizada na propriedade?' },
  { id: 7, dimension: 'environmental', text: 'A propriedade realiza controle de erosão do solo?' },
  { id: 8, dimension: 'environmental', text: 'Há sistema de compostagem ou aproveitamento de resíduos orgânicos?' },
  { id: 9, dimension: 'environmental', text: 'A propriedade possui reserva legal averbada?' },
  { id: 10, dimension: 'environmental', text: 'Existe programa de recuperação de áreas degradadas?' },
  { id: 11, dimension: 'environmental', text: 'A propriedade utiliza fontes de energia renovável?' },
  { id: 12, dimension: 'environmental', text: 'Há controle de emissões de gases de efeito estufa?' },
  { id: 13, dimension: 'environmental', text: 'A propriedade possui certificação ambiental?' },
  { id: 14, dimension: 'environmental', text: 'Existe sistema de irrigação eficiente (quando aplicável)?' },
  { id: 15, dimension: 'environmental', text: 'A propriedade realiza análise periódica do solo?' },
  { id: 16, dimension: 'environmental', text: 'Há programa de plantio de árvores nativas?' },
  { id: 17, dimension: 'environmental', text: 'A propriedade possui sistema de tratamento de efluentes?' },
  { id: 18, dimension: 'environmental', text: 'Existe controle de pragas com métodos sustentáveis?' },
  { id: 19, dimension: 'environmental', text: 'A propriedade realiza rotação de pastagens?' },
  { id: 20, dimension: 'environmental', text: 'Há monitoramento da biodiversidade local?' },
  { id: 21, dimension: 'environmental', text: 'A propriedade possui sistema de coleta seletiva?' },
  { id: 22, dimension: 'environmental', text: 'Existe uso racional da água na propriedade?' },
  { id: 23, dimension: 'environmental', text: 'A propriedade realiza adubação orgânica?' },
  { id: 24, dimension: 'environmental', text: 'Há controle de queimadas na propriedade?' },
  { id: 25, dimension: 'environmental', text: 'A propriedade possui licenciamento ambiental atualizado?' },

  // Social Questions (26-33)
  { id: 26, dimension: 'social', text: 'A propriedade oferece treinamento regular aos funcionários?' },
  { id: 27, dimension: 'social', text: 'Existe política de saúde e segurança do trabalho implementada?' },
  { id: 28, dimension: 'social', text: 'A propriedade mantém relacionamento com a comunidade local?' },
  { id: 29, dimension: 'social', text: 'Há programas de capacitação profissional para funcionários?' },
  { id: 30, dimension: 'social', text: 'A propriedade oferece benefícios sociais aos trabalhadores?' },
  { id: 31, dimension: 'social', text: 'Existe política de não discriminação no trabalho?' },
  { id: 32, dimension: 'social', text: 'A propriedade contribui para projetos sociais locais?' },
  { id: 33, dimension: 'social', text: 'Há respeito aos direitos trabalhistas e legislação vigente?' },

  // Governance Questions (34-41)
  { id: 34, dimension: 'governance', text: 'A propriedade possui sistema de controle financeiro organizado?' },
  { id: 35, dimension: 'governance', text: 'Existe planejamento estratégico formalizado para a propriedade?' },
  { id: 36, dimension: 'governance', text: 'A propriedade mantém registros e documentação atualizados?' },
  { id: 37, dimension: 'governance', text: 'Há transparência na gestão e tomada de decisões?' },
  { id: 38, dimension: 'governance', text: 'A propriedade possui código de conduta estabelecido?' },
  { id: 39, dimension: 'governance', text: 'Existe sistema de controle interno e auditoria?' },
  { id: 40, dimension: 'governance', text: 'A propriedade realiza prestação de contas regularmente?' },
  { id: 41, dimension: 'governance', text: 'Há políticas anticorrupção e de integridade implementadas?' },
];

export const classificationRanges = {
  environmental: {
    reactive: { min: 25, max: 42 },
    normative: { min: 43, max: 59 },
    proactive: { min: 60, max: 75 },
  },
  social: {
    reactive: { min: 8, max: 14 },
    normative: { min: 15, max: 20 },
    proactive: { min: 21, max: 24 },
  },
  governance: {
    reactive: { min: 8, max: 14 },
    normative: { min: 15, max: 20 },
    proactive: { min: 21, max: 24 },
  },
};

export function calculateClassification(score: number, dimension: keyof typeof classificationRanges): string {
  const ranges = classificationRanges[dimension];
  
  if (score >= ranges.proactive.min && score <= ranges.proactive.max) {
    return 'PROATIVA';
  } else if (score >= ranges.normative.min && score <= ranges.normative.max) {
    return 'NORMATIVA';
  } else {
    return 'REATIVA';
  }
}
