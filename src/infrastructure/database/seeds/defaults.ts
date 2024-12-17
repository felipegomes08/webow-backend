export default {
  transactionType: [
    {
      name: "deposit",
      label: "Depósito"
    },
    {
      name: "withdrawal",
      label: "Saque"
    }
  ],
  transactionStatus: [
    {
      name: "waitingPayment",
      label: "Aguardando Pagamento"
    },
    {
      name: "finished",
      label: "Concluída"
    },
    {
      name: "canceled",
      label: "Cancelado"
    },
    {
      name: "processing",
      label: "Em Processamento"
    },
  ],
  matchResult: [
    {
      name: "win",
      label: "Ganhou"
    },
    {
      name: "loss",
      label: "Perdeu"
    }
  ],
  accountType: [
    {
      name: "beginner",
      label: "Iniciante"
    },
    {
      name: "intermediary",
      label: "Intermediário"
    },
    {
      name: "advanced",
      label: "Avançado"
    }
  ],
  userStatus: [
    {
      name: "active",
      label: "Ativo"
    },
    {
      name: "inactive",
      label: "Inativo"
    },
    {
      name: "banned",
      label: "Banido"
    }
  ],
  userType: [
    {
      name: "administrator",
      label: "Administrador"
    },
    {
      name: "player",
      label: "Jogador"
    },
    {
      name: "affiliate",
      label: "Afiliado"
    },
    {
      name: "demo",
      label: "Demo"
    }
  ],
  rouletteValue: [
    {
      matchResultId: 'win',
      label: '30',
      value: 30
    },
    {
      matchResultId: 'loss',
      label: '30',
      value: 30
    },
    {
      matchResultId: 'win',
      label: '60',
      value: 60
    },
    {
      matchResultId: 'loss',
      label: '60',
      value: 60
    },
  ],
  configuration: {
    pixel: `
    <!-- Meta Pixel Code -->
    <script>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '875304520827655');
    fbq('track', 'PageView');
    </script>
    <noscript><img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id=875304520827655&ev=PageView&noscript=1"
    /></noscript>
    <!-- End Meta Pixel Code -->
    `,
    interface: {
      Sound_Opening: {
        value: "http://www.monkmaster.com/sound.mp3",
        description: "Som de abertura"
      },
      Sound_Background: {
        value: "http://www.monkmaster.com/sound.mp3",
        description: "Som de fundo"
      },
      Sound_ButtonClick: {
        value: "http://www.monkmaster.com/sound.mp3",
        description: "Som de clique em botão"
      },
      Sound_Spin: {
        value: "http://www.monkmaster.com/sound.mp3",
        description: "Som de giro"
      },
      Sound_Win: {
        value: "http://www.monkmaster.com/sound.mp3",
        description: "Som de vitória"
      },
      Sound_Loss: {
        value: "http://www.monkmaster.com/sound.mp3",
        description: "Som de perda"
      },
      Layout_Opening: {
        value: "http://www.monkmaster.com/sound.mp3",
        description: "Som para a abertura do layout"
      },
      TermsOfService_Text: {
        value: "Selecione o método de pagamento que será o modo pagamento o método de",
        description: "Termos de Uso"
      }
    },
    system: {
      EnableServerDivision: {
        value: 1,
        description: "Ativa a divisão de servidores para balanceamento de carga"
      },
      EnableSecureBettingProtocol: {
        value: 1,
        description: "Ativa protocolos de segurança para transações de apostas"
      },
      SecureBettingProtocolId: {
        value: 256,
        description: ""
      },
      BankPercentage: {
        value: 20,
        description: "Percentual da banca"
      },
      RegistrationStatus: {
        value: true,
        description: "Status do cadastro"
      },
      NumberOfMaxUser: {
        value: 1000,
        description: "Número máximo de usuários conectados simultaneamente"
      },
      MinimumBetLimit: {
        value: 10,
        description: "Limite mínimo de aposta permitido"
      },
      MaximumBetLimit: {
        value: 20000,
        description: "Limite máximo de aposta permitido"
      },
      RTP_Roulette: {
        value: 97.3,
        description: "Return to Player para roleta"
      },
      DepositPercentage: {
        value: 5,
        description: "Percentual de ganho sobre depósito"
      },
      BreakagePercentage: {
        value: 5,
        description: "Percentual de ganho sobre rodadas quebradas"
      },
      CPA: {
        value: 10,
        description: "R$ 10,00 por afiliação com depósito"
      },
      CPM: {
        value: 5000,
        description: "R$ 5000,00 por 1000 afiliações com depósito"
      },
      WelcomeBonusPercentage: {
        value: 100,
        description: "Percentual do bônus de boas vindas"
      },
      LoyaltyPointsRate: {
        value: 0.01,
        description: "Taxa de conversão de apostas em pontos de fidelidade"
      },
      EnableAuditLogging: {
        value: 1,
        description: "Ativa o registro de auditoria para rastrear transações"
      },
      ComplianceCheckInterval: {
        value: 30,
        description: "Intervalo para verificação de conformidade"
      },
      MaxDeposit: {
        value: 20000,
        description: "Limite máximo de depósito"
      },
      MinDeposit: {
        value: 10,
        description: "Limite mínimo de depósito"
      },
      MinWithdrawal: {
        value: 100,
        description: "Limite mínimo de saque"
      },
      MaxWithdrawal: {
        value: 2000,
        description: "Limite máximo de saque"
      },
      PixPaymentActive: {
        value: true,
        description: "Status do método de pagamento Pix"
      },
      CardPaymentActive: {
        value: false,
        description: "Status do método de pagamento com cartão"
      },
      SoundEnabled: {
        value: 0,
        description: "Som ativado ou não (0 para desativado, 1 para ativado)"
      },
      PlayerSatisfactionSurveyEnabled: {
        value: 1,
        description: "Ativa o recurso de pesquisa de satisfação"
      },
      SurveyFrequency: {
        value: 30,
        description: "Frequência da pesquisa em dias"
      },
      PlayerSatisfactionResponses: {
        value: {},
        description: "Armazenamento das respostas da pesquisa"
      },
      ML_DynamicSuccessAnalysis: {
        value: 1,
        description: "Ativa análise dinâmica de sucesso via Machine Learning"
      },
      PlayerTypeAdjustment: {
        value: true,
        description: "Ajusta a taxa de sucesso com base no tipo de jogador (novo ou antigo)"
      },
      GameRoundAdjustment: {
        value: true,
        description: "Ajusta a taxa de sucesso com base no número de rodadas jogadas"
      },
      WinHistoryAdjustment: {
        value: true,
        description: "Ajusta a taxa de sucesso com base no histórico de ganhos"
      },
      GameCountAdjustment: {
        value: true,
        description: "Ajusta a taxa de sucesso com base no número total de jogos jogados"
      },
      BetValueAdjustment: {
        value: true,
        description: "Ajusta a taxa de sucesso com base no valor da aposta"
      },
      BankHealthDynamicAdjustment: {
        value: true,
        description: "Ajusta a taxa de sucesso com base na saúde financeira da banca"
      },
      ML_Enabled: {
        value: 1,
        description: "Habilita a aplicação de Machine Learning"
      },
      ML_ModelPath: {
        value: "path/to/your/model.pkl",
        description: "Caminho para o modelo treinado"
      },
      ML_Features: {
        value: [
          "player_type",
          "daily_rounds",
          "win_loss_history",
          "total_games",
          "bet_value",
          "bank_balance"
        ],
        description: ""
      },
      DynamicAdjustmentEnabled: {
        value: 1,
        description: "Habilita ajustes dinâmicos com base na previsão do modelo"
      },
      AdjustmentLimits: {
        value: {
          min: 0.05,
          max: 0.95
        },
        description: "Limites de ajuste da taxa de sucesso"
      },
      PerformanceMonitoringEnabled: {
        value: 1,
        description: "Ativa o monitoramento de performance do sistema"
      },
      StressTestSchedule: {
        value: "monthly",
        description: "Agenda para testes de estresse mensais"
      },
      BackupEnabled: {
        value: 1,
        description: "Habilita backups regulares dos dados"
      },
      BackupInterval: {
        value: "weekly",
        description: "Intervalo de backup semanal"
      },
      DisasterRecoveryPlan: {
        value: "path/to/recovery_plan.pdf",
        description: "Caminho para o plano de recuperação de desastres"
      },
      RateLimitingEnabled: {
        value: 1,
        description: "Ativa limitação de taxa para prevenir ataques DoS"
      },
      MaxRequestsPerMinute: {
        value: 100,
        description: "Máximo de requisições por minuto por IP"
      }
    },
    active: true
  }
}
