# Order - NodeJs Clean Architecture
Order é um pequeno projeto de REST API construída com Node.js, estruturada em [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) com o objetivo de dividir o software em camadas proporcionando um desacoplamento do núcleo da aplicação tornando-o o máximo possível, independente de bibliotecas/frameworks. O core da aplicação é composto por: 

core/  
  ---domain/  
  ---entity/  
  ---repository/  
  ---usecase/
 
Na camada de adpter é possível abstrair o framework podendo ser usado Express, Hapi ou qualuer outro.
 
Esse projeto foi desenvolvido seguindo os padrões aplicados na live do FullCycle Clean Architecture com [Rodrigo Branas](https://github.com/rodrigobranas) a quem agradeço imensamente pelo conhecimento que tem disseminado à comunidade. Muito Obrigado.

###Setup para esse projeto
Essse projeto utiliza: Node.js, Typescript, 
 
