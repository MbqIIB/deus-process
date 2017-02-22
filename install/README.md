Inštálacia
==========

1. Import TWX do IBM BPM
2. Definovanie tímov v IBM BPM
3. Konfigurácia Toolkit-u
4. Konfigurácia Aplikácie
5. Vytvorenie Saved Search Queries

Import TWX do IBM BPM
---------------------

Business Process aplikácia pozostáva z:
1. Toolkit-u "DEUS - Rozhrania"
   - DEUS_-_Rozhrania - <verzia>.twx
2. aplikácie "DEUS - Elektronická úverová žiadosť"
   - DEUS_-_Elektronická_úverová_žiadosť - <verzia>.twx

Uvedené exporty sú umiestnené v adresári exports.

Exporty (posledné verzie) je potrebné importnú do IBM BPM Repository podľa zaužívaných postupov alebo dokumentácie k produktu.

Definovanie tímov v IBM BPM
---------------------------

Podmienkou pre vykonanie tohto kroku je:
1. konfigurácia IBM WebSphere Cell s custom federated user registry na Kwiera systém
2. zadefinovanie skupín v Kwiera pre jednotlivé role.

Pre aplikáciu "DEUS - Elektronická úverová žiadosť" je potrebné zadefinovať členov jednotivých tímov:
   - Obchodníci
   - Evidovatelia
   - Schvaľovatelia
   - SpracovateliaDokumentov
   - Vyplácači
   - Supervizori

Konfigurácia Toolkitu
---------------------

Toolkit obsahuje komponenty pre technické napojenie sa na externé a interné systémy a takisto poskytuje rozhrania pre webovú aplikáciu DEUS.

### Definovanie endpointov:

_deus.app.rest.endpoint_

Webová aplikácia DEUS poskytuje REST služby na adrese napr. http://wastest:9080/deus-services/api/ .
Overenie funkčnosti v prehliadači http://wastest:9080/deus-services/api/application/{ECU}

_ibs.rest.ecu.endpoint_

Rezervácia resp. uvoľnenie EČU je realizované prostredníctvom REST služby v systéme IBS na adrese napr. http://wastest:9080/ecuws/rest/ecu/ .
Overenie funkčnosti v prehliadači http://wastest:9080/ecuws/swagger-ui.html

_ibm.api.rest.savedQuery.endpoint_
a
_ibm.api.rest.taskData.endpoint_

Interné REST API od IBM pre prístup UserTask-om môže byť odkazovaná cez localhost
http://localhost:9081/rest/bpm/wle/v1/tasks/query/
a
http://localhost:9081/rest/bpm/wle/v1/service/
alebo cez LB, pričom je potrebné zabezpečiť konektivitu (sám na seba cez LB).

_ibm.api.rest.securityAlias_

Pre prístup k IBM REST API je potrebné použíť autentikovaný pristup prostredníctvom J2C auth (IBM WAS Admin Console: Global security > JAAS - J2C authentication data). Uvedené konto musí mať admin prístup k BPM REST API.
Odporúčame ponechať tento konfiguračný kľúč na hodnote DeAdminAlias.

### Konfigurácia Saved Search Query

Prístup ku košom úloh pre jednotlivé role, používateľov a k EČU sa v aplikácií využívajú tzv. Saved Search Queries (viď. Saved Search Admin v IBM BPM Process Admin Console).

_deus.api.savedQuery.*_

Názvy jednotlivých Saved Search Queries začínajú reťazcom _DEUSAPP.UTB._ , aby boli oddelené od ostatných, ktoré možno používajú iné aplikácie alebo správcovia. (Upozornenie: V IBM BPM verzii nižšej ako 8.5.5 je chyba, kedy jednotlivé Saved Search Queries si môžu prepisovať)
Saved Search Queries:
   - _DEUSAPP.UTB.ECU_: sa používa pre vyhľadanie aktívnych DEUS-ov
   - _DEUSAPP.UTB.User_: sa používa pre vyhľadanie priradených DEUS-ov
   - _DEUSAPP.UTB.*_: sa používa ako pracovné koše pre jednotlivé role

Vytvorenie uvedených Saved Search Queries je popísané nižšie.

Konfigurácia Aplikácie
----------------------

Konfigurácia aplikácie pozostáva najmä z definovania časových ohraničení (_*.threshold.*_) pre jednotlivé aktivity a aj celý proces spracovania DEUS-u.


Vytvorenie Saved Search Queries
-------------------------------

Pre vytvorenie jednotlivých Saved Search Queries je potrebné použiť aplikáciu SOAPui (https://www.soapui.org/). V adresári scripts sa nachádza SOAPui projekt _DEUS-BPM-REST-Search-API-soapui-project.xml_, ktorý je potrebné Importnúť do SOAPui.

Tento projekt má nadefinované a je potrebné nastaviť:
   - Project properties: _deusapp.username_ a _deusapp.passwd_ ako auth pre IBM BPM REST služby
   - Service Endpoints: hostname a port IBM BPM servera
   - REST volania: sa nachádzajú v podstrome query/PUT

Jednotlívé REST volania je potrebné spustiť a v pravej časti v záložke JSON skontrolovať, či prebehli v poriadku ("status": "200"). Ešte je možné výsledok overiť aj v Saved Search Admin v IBM BPM Process Admin Console.
