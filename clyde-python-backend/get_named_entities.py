from pathlib import Path
from dotenv import load_dotenv
env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)
from expertai.nlapi.cloud.client import ExpertAiClient


def get_named_entiites(client, text):
	language = 'en'
	output = client.specific_resource_analysis(body={"document": {"text": text}}, params={'language': language, 'resource': 'entities'})

def main():
	client = ExpertAiClient()
	text2 =  """Just How Big Could India’s True Covid-19 Case and Death Toll Be?- The New York Times  Sections SEARCH Skip to content Skip to site index Asia Pacific Log in Today’s Paper Asia Pacific | Just How Big Could India’s True Covid Toll Be?https://nyti.ms/3fLpq17 India’s  Covid Crisis What to Know Map and Case Count Inside the Crisis Undercounted Deaths The Oxygen Crisis How to Help Advertisement Continue reading the main story Comments  Just How Big Could India’s True Covid Toll Be?Skip to Comments The comments section is closed.To submit a letter to the editor for publication, write to       letters@nytimes.com .Just How Big Could India’s True Covid Toll Be?By  Lazaro Gamio  and  James Glanz May 25, 2021 101 ======================================================THIS IS A GENERATED TEMPLATE FILE.DO NOT EDIT.======================================================      sprites, polyfills, imports       story top/cover and links    LINKS      Official counts   26.9 million  Reported cases    307,231  Reported deaths    Data as of May 24  A conservative scenario   404.2 million  Estimated infections    600,000  Estimated deaths    15 infections per reported case with an infection fatality rate of 0.15%  A more likely scenario   539.0 million  Estimated infections    1.6 million  Estimated deaths    20 infections per reported case with an infection fatality rate of 0.30%  A worse scenario   700.7 million  Estimated infections    4.2 million  Estimated deaths    26 infections per reported case with an infection fatality rate of 0.60%               The official Covid-19 figures in India grossly understate the true scale of  the pandemic  in the country.Last week, India recorded the  largest daily death toll  for any country during the pandemic — a figure that is most likely  still an undercount .Even getting a clear picture of the total number of infections in India is hard because of poor record-keeping and a lack of widespread testing.Estimating the true number of deaths requires a second layer of extrapolation, depending on the share of those infected who end up dying.In consultation with more than a dozen experts, The New York Times has analyzed case and death counts over time in India, along with the results of large-scale antibody tests, to arrive at several possible estimates for the true scale of devastation in the country.Even in the least dire of these, estimated infections and deaths far exceed official figures.More pessimistic ones show a toll on the order of millions of deaths — the most catastrophic loss anywhere in the world.Why official data underrepresents India’s pandemic                         publish_time: Tue May 25 2021 09:26:07 GMT+0000 (Coordinated Universal Time)    India Coronavirus Cases    100,000   200,000   300,000   400,000 cases    Feb.     2020     Mar.Apr.May             Jun.Jul.Aug.            Sept.           Oct.            Nov.            Dec.            Jan.   2021     Feb.           2021  Mar.Apr.May                       New cases  7–day average   245,697        These are days with a reporting anomaly.About this data  Source: Center for Systems Science and Engineering (CSSE) at Johns Hopkins University.The daily average is calculated with data that was reported in the last seven days.publish_time: Tue May 25 2021 09:26:08 GMT+0000 (Coordinated Universal Time)    India Coronavirus Deaths    2,000   4,000 deaths    Feb.    2020     Mar.Apr.May             Jun.Jul.Aug.            Sept.           Oct.            Nov.            Dec.            Jan.   2021     Feb.           2021  Mar.Apr.May                       Deaths  7–day average   4,073        These are days with a reporting anomaly.About this data  Source: Center for Systems Science and Engineering (CSSE) at Johns Hopkins University.The daily average is calculated with data that was reported in the last seven days.India’s official Covid statistics report 26,948,800 cases and 307,231 deaths as of May 24.Even in countries with robust surveillance during this pandemic, the number of infections is probably much higher than the number of confirmed cases because many people have contracted the virus but have not been tested for it.On Friday, a report by the World Health Organization  estimated  that the global death toll of Covid-19 may be two or three times higher than reported.The undercount of cases and deaths in India is most likely even more pronounced, for technical, cultural and logistical reasons.Because hospitals are overwhelmed, many Covid deaths occur at home, especially in rural areas, and are omitted from the official count, said Kayoko Shioda, an epidemiologist at Emory University.Laboratories that could confirm the cause of death are equally swamped, she said.Additionally, other researchers have found, there are few Covid tests available; often families are unwilling to say that their loved ones have died of Covid; and the system for keeping vital records in India is shaky at best.Even before Covid-19, about four out of five deaths in India were not medically investigated.A conservative scenario     If the real number of infections is…  15x higher                         404.2 million  Estimated infections  Reported number of cases: 26.9 million as of May 24.And the infection fatality rate is…  0.15%                      600,000  Estimated deaths  2.0x the current reported total of 300,000 as of May 24.To arrive at more plausible estimates of Covid infections and deaths in India, we used data from three nationwide antibody tests, called serosurveys.In each serosurvey, a subset of the population (about 30,000 of India’s 1.4 billion people) is examined for Covid-19 antibodies.Once researchers have figured out the share of those people whose blood is found to contain antibodies, they extrapolate that data point, called the seroprevalence, to arrive at an estimate for the whole population.The antibody tests offer one way to correct official records and arrive at better estimates of total infections and deaths.The reason is simple: Nearly everyone who contracts Covid-19 develops antibodies to fight it, leaving traces of the infection that the surveys can pick up.Even a wide-scale serosurvey has its limitations, said Dan Weinberger, an associate professor of epidemiology at the Yale School of Public Health.India’s population is so large and diverse that it’s unlikely any serosurvey could capture the full range.Still, Dr. Weinberger said, the surveys provide a fresh way to calculate more realistic death figures.“It gives us a starting point,” he said.“I think that an exercise like this can put some bounds on the estimates.”   Even in the most conservative estimates of the pandemic’s true toll, the number of infections is several times higher than official reports suggest.Our first, best-case scenario assumes a true infection count 15 times higher than the official number of recorded cases.It also assumes an infection fatality rate, or I.F.R.— the share of all those infected who have died — of 0.15 percent.Both of these numbers are on the low end of the estimates we collected from experts.The result is a death toll roughly double what’s been reported to date.A more likely scenario     If the real number of infections is…  20x higher                          539.0 million  Estimated infections  Reported number of cases: 26.9 million as of May 24.And the infection fatality rate is…  0.30%                      1.6 million  Estimated deaths  5.3x the current reported total of 300,000 as of May 24.The latest national seroprevalence study in India ended in January, before the current wave, and estimated roughly 26 infections per reported case.This scenario uses a slightly lower figure, in addition to a higher infection fatality rate of 0.3 percent — in line with what has been  estimated  in the United States at the end of 2020.In this scenario, the estimated number of deaths in India is more than five times the official reported count.“As with most countries, total infections and deaths are undercounted in India,” said Dr. Ramanan Laxminarayan, director of the Center for Disease Dynamics, Economics & Policy.“The best way to arrive at the most likely scenario would be based on triangulation of data from different sources, which would indicate roughly 500 to 600 million infections.”   A worse scenario     If the real number of infections is…  26x higher                  700.7 million  Estimated infections  Reported number of cases: 26.9 million as of May 24.And the infection fatality rate is…  0.60%                       4.2 million  Estimated deaths  13.7x the current reported total of 300,000 as of May 24.This scenario uses a slightly higher estimate of true infections per known case, to account for the current wave.The infection fatality rate is also higher — double the rate of the previous scenario, at 0.6 percent — to take into account the tremendous stress that India’s health system has been under during the current wave.Because hospital beds, oxygen and other medical necessities have been  scarce  in recent weeks, a greater share of those who contract the virus may be dying, driving the infection fatality rate higher.Explore the numbers     If the real number of infections is…  10x higher                        269.5 million  Estimated infections  Reported number of cases: 26.9 million as of May 24.And the infection fatality rate is…  0.10%     260,000  Estimated deaths  0.9x the current reported total of 300,000 as of May 24.Because there are two different unknowns, there is a wide range of plausible values for the true infection and death counts in India, Dr. Shioda said.“Public health research usually provides a wide uncertainty range,” she said.“And providing that kind of uncertainty to readers is one of the most important things researchers do.”        Explore possible scenarios for yourself in the interactive above.How we estimated case multiplie"""
	get_named_entiites(text2)

if __name__ == "__main__":
	main()