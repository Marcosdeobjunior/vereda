export type NodeType = 'personagem' | 'cena' | 'local' | 'ideia'
export type Status = 'Rascunho' | 'Revisar' | 'Pronto' | 'Ideia'

export const NODE_COLORS: Record<NodeType, string> = {
  personagem: '#B65C3F',
  cena: '#C2924A',
  local: '#6E7350',
  ideia: '#5F7470',
}

export const STATUS_COLORS: Record<Status, string> = {
  Pronto: '#6E7350',
  Revisar: '#C2924A',
  Rascunho: '#B65C3F',
  Ideia: '#5F7470',
}

export interface StoryNode {
  id: string
  type: NodeType
  label: string
  description: string
  x: number
  y: number
  r: number
}

export interface StoryEdge {
  id: string
  a: string
  b: string
}

export interface Chapter {
  id: string
  act: number
  order: number
  title: string
  synopsis: string
  status: Status
  pov?: string
  wordCount: number
  body: string
}

export const NODES: StoryNode[] = [
  { id: 'joana', type: 'personagem', label: 'Joana', description: 'Protagonista. Filha do dono da fazenda, carrega o peso do silêncio familiar.', x: 420, y: 300, r: 22 },
  { id: 'ines', type: 'personagem', label: 'Inês', description: 'Irmã mais nova de Joana. Sonha em partir para a cidade.', x: 180, y: 160, r: 16 },
  { id: 'aurora', type: 'personagem', label: 'Aurora', description: 'Matriarca da família. Guarda segredos sobre o passado do açude.', x: 560, y: 440, r: 18 },
  { id: 'manoel', type: 'personagem', label: 'Manoel', description: 'Peão mais antigo da fazenda. Testemunha silenciosa de décadas.', x: 240, y: 460, r: 14 },
  { id: 'pedro', type: 'personagem', label: 'Pedro', description: 'Vizinho que reivindica parte das terras. Antagonista velado.', x: 680, y: 200, r: 14 },
  { id: 'casa', type: 'local', label: 'A Casa', description: 'A casa de barro centenária. Centro gravitacional de toda a narrativa.', x: 420, y: 160, r: 26 },
  { id: 'acude', type: 'local', label: 'Açude', description: 'O açude está secando. Sua diminuição espelha o colapso familiar.', x: 620, y: 120, r: 20 },
  { id: 'estrada', type: 'local', label: 'Estrada', description: 'A estrada que leva à cidade. Símbolo de fuga e possibilidade.', x: 100, y: 340, r: 14 },
  { id: 'cemiterio', type: 'local', label: 'Cemitério', description: 'Pequeno cemitério da fazenda. Guarda as gerações anteriores.', x: 720, y: 360, r: 14 },
  { id: 'seca', type: 'cena', label: 'A Seca', description: 'Cena de abertura. Joana observa o açude baixar pela primeira vez.', x: 160, y: 320, r: 18 },
  { id: 'carta', type: 'cena', label: 'A Carta', description: 'A carta chega dobrada em quatro, com o carimbo borrado da cidade.', x: 420, y: 460, r: 16 },
  { id: 'confronto', type: 'cena', label: 'O Confronto', description: 'Joana e Pedro discutem os direitos sobre a terra pela primeira vez.', x: 640, y: 300, r: 16 },
  { id: 'partida', type: 'cena', label: 'A Partida', description: 'Inês anuncia que vai embora. A família se parte ao meio.', x: 280, y: 200, r: 14 },
  { id: 'descoberta', type: 'cena', label: 'A Descoberta', description: 'Aurora revela o segredo sobre as pedras do fundo do açude.', x: 520, y: 380, r: 18 },
  { id: 'retorno', type: 'cena', label: 'O Retorno', description: 'Inês volta, mudada. A chuva chega junto com ela.', x: 180, y: 440, r: 14 },
  { id: 'memoria', type: 'ideia', label: 'Memória', description: 'Tema central: o que herdamos sem escolher, o que esquecemos sem querer.', x: 700, y: 260, r: 16 },
  { id: 'agua', type: 'ideia', label: 'Água', description: 'A água como metáfora de tempo, vida e esquecimento.', x: 340, y: 80, r: 14 },
  { id: 'terra', type: 'ideia', label: 'Terra', description: 'A terra que sustenta e aprisiona ao mesmo tempo.', x: 80, y: 220, r: 13 },
  { id: 'silencio', type: 'ideia', label: 'Silêncio', description: 'O silêncio como linguagem familiar — o que não se diz carrega mais.', x: 760, y: 160, r: 13 },
  { id: 'chuva', type: 'ideia', label: 'Chuva', description: 'A chuva esperada. Redenção ou adiamento do inevitável.', x: 480, y: 80, r: 12 },
]

export const EDGES: StoryEdge[] = [
  { id: 'e1', a: 'joana', b: 'casa' },
  { id: 'e2', a: 'joana', b: 'ines' },
  { id: 'e3', a: 'joana', b: 'aurora' },
  { id: 'e4', a: 'joana', b: 'seca' },
  { id: 'e5', a: 'joana', b: 'carta' },
  { id: 'e6', a: 'joana', b: 'confronto' },
  { id: 'e7', a: 'joana', b: 'descoberta' },
  { id: 'e8', a: 'ines', b: 'partida' },
  { id: 'e9', a: 'ines', b: 'retorno' },
  { id: 'e10', a: 'ines', b: 'estrada' },
  { id: 'e11', a: 'aurora', b: 'casa' },
  { id: 'e12', a: 'aurora', b: 'descoberta' },
  { id: 'e13', a: 'aurora', b: 'memoria' },
  { id: 'e14', a: 'pedro', b: 'confronto' },
  { id: 'e15', a: 'pedro', b: 'acude' },
  { id: 'e16', a: 'manoel', b: 'casa' },
  { id: 'e17', a: 'manoel', b: 'cemiterio' },
  { id: 'e18', a: 'casa', b: 'acude' },
  { id: 'e19', a: 'casa', b: 'agua' },
  { id: 'e20', a: 'acude', b: 'seca' },
  { id: 'e21', a: 'acude', b: 'descoberta' },
  { id: 'e22', a: 'acude', b: 'agua' },
  { id: 'e23', a: 'seca', b: 'carta' },
  { id: 'e24', a: 'carta', b: 'aurora' },
  { id: 'e25', a: 'confronto', b: 'terra' },
  { id: 'e26', a: 'partida', b: 'retorno' },
  { id: 'e27', a: 'descoberta', b: 'memoria' },
  { id: 'e28', a: 'memoria', b: 'silencio' },
  { id: 'e29', a: 'agua', b: 'chuva' },
  { id: 'e30', a: 'retorno', b: 'chuva' },
  { id: 'e31', a: 'terra', b: 'casa' },
  { id: 'e32', a: 'silencio', b: 'aurora' },
  { id: 'e33', a: 'cemiterio', b: 'memoria' },
]

export const CHAPTERS: Chapter[] = [
  {
    id: 'c1', act: 1, order: 1, title: 'A Seca', synopsis: 'Joana observa o açude baixar pela primeira vez. O calor não cede.', status: 'Pronto', pov: 'Joana', wordCount: 2140,
    body: `A carta chegou numa terça, dobrada em quatro, com o carimbo borrado da cidade. Joana a guardou no bolso do avental por três dias antes de ter coragem de abri-la.\n\nLá fora, o açude continuava baixando. Cada manhã a água recuava mais um palmo, deixando à mostra um cerco de pedras que ninguém lembrava de ter visto.`,
  },
  {
    id: 'c2', act: 1, order: 2, title: 'O Primeiro Dia', synopsis: 'Manoel conta sobre o último verão que a água sumiu assim.', status: 'Pronto', pov: 'Joana', wordCount: 1890,
    body: `Manoel disse que a última vez que o açude secou assim foi no ano que o pai de Joana nasceu. Ele falava devagar, como quem mede cada palavra antes de soltá-la.\n\n— Quando a água some, outras coisas aparecem — disse ele, sem olhar para ela.`,
  },
  {
    id: 'c3', act: 1, order: 3, title: 'A Carta', synopsis: 'A carta da cidade traz notícias que ninguém estava esperando.', status: 'Revisar', pov: 'Joana', wordCount: 1284,
    body: `A carta chegou numa terça, dobrada em quatro, com o carimbo borrado da cidade. Joana a guardou no bolso do avental por três dias antes de ter coragem de abri-la.\n\nLá fora, o açude continuava baixando. Cada manhã a água recuava mais um palmo, deixando à mostra um cerco de pedras que ninguém lembrava de ter visto.`,
  },
  {
    id: 'c4', act: 2, order: 1, title: 'A Partida de Inês', synopsis: 'Inês anuncia que vai embora para a cidade. Aurora chora em silêncio.', status: 'Pronto', pov: 'Inês', wordCount: 2560,
    body: `Inês fez a mala numa hora. Não trouxe nada do quarto — só as roupas e o caderno onde escrevia de madrugada.\n\nAurora ficou na varanda até o carro dobrar a curva da estrada. Depois entrou sem dizer nada.`,
  },
  {
    id: 'c5', act: 2, order: 2, title: 'Pedro', synopsis: 'Pedro chega com documentos. A disputa pelas terras começa.', status: 'Rascunho', pov: 'Joana', wordCount: 980,
    body: `Pedro trouxe os papéis numa pasta plástica amarela. Sentou à mesa da cozinha sem ser convidado e abriu os documentos com cuidado excessivo, como quem já ensaiou isso muitas vezes.`,
  },
  {
    id: 'c6', act: 3, order: 1, title: 'A Descoberta', synopsis: 'Aurora revela o que há no fundo do açude. Tudo muda.', status: 'Ideia', pov: 'Aurora', wordCount: 0,
    body: '',
  },
]
