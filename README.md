# node_spa_post
1. 수정, 삭제 API에서 Resource를 구분하기 위해서 Request를 어떤 방식으로 사용하셨나요? (`param`, `query`, `body`)
수정 및 삭제를 할때 id값을 params로 가져와서 find에 사용하였고
입력값(비밀번호와 같은) 것들을 가져오기위해 body를 사용했음
2. HTTP Method의 대표적인 4가지는 `GET`, `POST`, `PUT`, `DELETE` 가있는데 각각 어떤 상황에서 사용하셨나요?
post의 전체(내림차순,GET), post의 일부분(GET), post 올리기(POST), post 수정(PUT), post 삭제(DELETE)
post의 comment 전체(내림차순,GET), comment 올리기(POST), comment 수정(PUT), comment 삭제(DELETE)
3. RESTful한 API를 설계했나요? 어떤 부분이 그런가요? 어떤 부분이 그렇지 않나요?
예비군을 다녀오느냐고 하루 빠졌더니 시간이 좀 부족했던 것 같아 완성도가 떨어지는 것 같음
4. 역할별로 Directory Structure를 분리하였을 경우 어떠한 이점이 있을까요?
코드를 수정하고 삽입하는데에 이점이 있을 것 같다. 분리해 놓으면 어느 부분에 어떤 오류가 발생했는지 빨리 알아챌 수 있고, 어느 부분에
어떤 것을 추가하면 될 것 같다가 한눈에 보이는 장점이 있기 때문에 분리해두는 것이 좋은 것 같다.
