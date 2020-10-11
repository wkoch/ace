Abre o app

# Eventos Automáticos:

## Intervalos (Depende de Almoço e Chuvas)
    1. Processa intervalo de períodos
    2. Processa intervalos de chuva, quando houver


## Períodos (Depende de Manhã, Tarde e Intervalos)
    1. Checa períodos ativos
    2. Processa períodos
        1. Converte horários para milisegundos
        2. Calcula SPAN


## Vistorias (Depende de Períodos)
    1. Calcula de forma simples as vistorias dentre os períodos
    2. Unifica Lista de Vistorias com Intervalos
    3. Recalcula de forma precisa cada período, com ou sem aleatoriedade, (Recuperadas com horário final do período), 
    4. Retorna o relatório preciso com intervalos
    5. Imprime o relatório na tela.



# Eventos de Usuários

## Adicionar chuva
    1. Atualiza lista de intervalos com nova chuva (Ordenada)

## Adicionar Vistoria (N, F, R)
    1. Atualiza lista de Vistorias com nova vistoria (Apenas marcando o index e tipo)