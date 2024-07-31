<template>
  <b-container tag="header" class="header">
    <b-row>
      <b-col class="title" cols="12" md="9" lg="10">
        <h1>
          <span v-html="$t('title')"></span><span class="subtitle" v-b-modal.partnership :title="$t('partnership-label')">{{ $t("partnership") }}</span>
        </h1>
        <block class="intro-block">
          <div v-if="$i18n.locale === 'en'">
            <h2>The goal of the video gallery</h2>
            <p> To provide a forum for First Nations, Inuit and Métis federal public service employees to share their stories. Sharing can contribute to building bridges of understanding and advancing reconciliation. </p>
          </div>
          <div v-if="$i18n.locale === 'fr'">
            <h2>Le but de cette galerie vidéo</h2>
            <p> Offrir une tribune aux fonctionnaires fédéraux des Premières Nations, Inuit et Métis pour partager des histoires. Le partage peut contribuer à construire des ponts de compréhension et aider à faire avancer la réconciliation. </p>
          </div>

          <b-button class="contribute" v-b-modal.contribute :title="$t('contribute-label')">{{ $t("contribute") }}
            <font-awesome-icon icon="chevron-circle-right" size="1x" role="presentation" />
          </b-button>
          <b-button class="warning" v-b-modal.warning :title="$t('warning-label')">{{ $t("warning") }}
            <font-awesome-icon icon="chevron-circle-right" size="1x" role="presentation" />
          </b-button>
        </block>
      </b-col>
      
      <!----<b-col cols="3" lg="2" class="d-none d-md-block">
        <ils />
      </b-col> -->

      <nuxt-link role="button" v-for="locale in availableLocales" :key="locale.code" :to="switchLocalePath(locale.code)" class="langswitch text-right" :lang="locale.code" :title="(locale.code === 'en' ? 'Switch to ' : 'Changer au ') + locale.name"><span>{{ locale.name }}</span>
      </nuxt-link>
      
      <b-modal id="contribute" :title="$t('contribute')" centered cancel-disabled :header-close-label="$t('close')" :ok-title="$t('close')" ok-only size="xl" title-tag="h2">
        <main>
          <h3>{{ $t("contribute_subtitle_1") }}</h3>

          <div role="tablist" class="acc-wrapper">
            <accordion id="contribute_acc_1" accordion="contribute_acc_group_1">
              <template v-slot:title>{{
                $t("contribute_acc_1_title")
              }}</template>
              <template v-slot:content>
                <b-row v-if="$i18n.locale === 'en'">
                  <b-col cols="12">
                    <p>
                      <strong>Goal:</strong> To provide a forum for First Nations, Inuit and Métis federal public service employees to share their stories. Sharing can contribute to building bridges of understanding and advancing reconciliation. </p>
                    <p>
                      <strong>What and how:</strong> To produce a brief (under 5 minutes) video, filmed from your mobile device/camera or on MS Teams and submit directly to our website. </p>
                    <p>
                      <strong>Who:</strong> First Nations, Inuit and Métis federal public service employees </p>
                    <p>
                      <strong>Your Story:</strong> Many non-Indigenous federal public service employees may not be familiar with the cultural plurality and diversity that distinguishes First Nations, Inuit and Métis, nor with the realities that Indigenous people experience in their daily life and work. </p>
                    <ul>
                      <li>What do you feel they should know?</li>
                      <li> What would you like to share as a gift to your colleagues? </li>
                      <li> What message do you have? Some examples: <ul>
                          <li> a practice that is specific to your culture, your language, your identity </li>
                          <li>a way to get involved with your community</li>
                          <li>a path toward connecting with your community</li>
                          <li> a first attempt at reclaiming your culture/identity </li>
                          <li>a memorable moment or encounter</li>
                          <li> the awakening to your culture/reading/arts/music/spirituality </li>
                          <li>the values that identify you</li>
                          <li>how you reconcile the two world views</li>
                          <li>initiatives in which you participate</li>
                          <li>your reflection, your hope for the future</li>
                          <li>how you like to be recognized</li>
                          <li>and more.</li>
                        </ul>
                      </li>
                    </ul>
                    <p class="text-center">
                      <strong>Share your truth in reconciliation!</strong>
                    </p>
                  </b-col>
                </b-row>
                <b-row v-else-if="$i18n.locale === 'fr'">
                  <b-col cols="12">
                    <p>
                      <strong>But&nbsp;:</strong> Offrir une tribune aux fonctionnaires fédéraux des Premières Nations, Inuit et Métis pour partager des histoires. Le partage peut contribuer à construire des ponts de compréhension et aider à faire avancer la réconciliation. </p>
                    <p>
                      <strong>Quoi et comment&nbsp;:</strong> Produire une courte vidéo (moins de 5 minutes), filmée à partir de votre appareil mobile/caméra ou même MS Teams et la soumettre directement sur notre site web. </p>
                    <p>
                      <strong>Qui&nbsp;:</strong> Les fonctionnaires fédéraux des Premières Nations, Inuit et Métis </p>
                    <p>
                      <strong>Votre histoire&nbsp;:</strong> De nombreux fonctionnaires fédéraux non autochtones peuvent ne pas être familier avec la pluralité culturelle et la diversité qui distinguent les Premières nations, les Inuits et les Métis, ni les réalités vécues par les autochtones dans leur vie quotidienne et au travail. </p>
                    <ul>
                      <li>Que pensez-vous qu'ils devraient savoir ?</li>
                      <li> Qu'aimeriez-vous partager comme cadeau à vos collègues ? </li>
                      <li> Quel est votre message? À titre d’exemples&nbsp;: <ul>
                          <li> une pratique propre à votre culture, à votre langue, à votre identité </li>
                          <li> une façon de vous impliquer auprès de votre communauté </li>
                          <li> l’amorce d’un rapprochement auprès de votre communauté </li>
                          <li> une démarche de réappropriation de votre culture/identité </li>
                          <li>une rencontre ou un moment marquant</li>
                          <li> l’éveil à votre culture/lecture/arts/musique/spiritualité </li>
                          <li>les valeurs qui vous représentent</li>
                          <li> votre façon de concilier les deux visions du monde </li>
                          <li>une initiative à laquelle vous participez</li>
                          <li>votre réflexion, votre espoir face à l’avenir</li>
                          <li> la façon dont vous aimez qu’on vous reconnaisse </li>
                          <li>et plus encore.</li>
                        </ul>
                      </li>
                    </ul>
                    <p class="text-center">
                      <strong>Partagez votre vérité dans la réconciliation!</strong>
                    </p>
                  </b-col>
                </b-row>
              </template>
            </accordion>
            <accordion id="contribute_acc_2" accordion="contribute_acc_group_1">
              <template v-slot:title>{{
                $t("contribute_acc_2_title")
              }}</template>
              <template v-slot:content>
                <b-row v-if="$i18n.locale === 'en'">
                  <b-col cols="12">
                    <ul>
                      <li> Maximum duration of 5 minutes. Aim for 2 to 3 minutes. </li>
                      <li> If you are bilingual. Produce two videos. One in French and one in English. Do not switch from one language to the other in the same video. </li>
                      <li> If you speak an Indigenous language, feel free to greet us in your language. If you add a sentence or two in an Indigenous language, please translate it in English and/or French. </li>
                      <li> Be natural, standing in front of the camera (in stand up mode if possible) and deliver your story or testimony while looking directly at the camera. Stay natural: imagine that you are talking to a colleague or a friend. </li>
                      <li> For the more experienced, feel free to add relevant, quality and royalty-free visuals. Remember, your testimony takes precedence over visual effects. </li>
                      <li> Do not add music. It is probably not copyright free. </li>
                      <li> Ensure to leave extra seconds at the beginning and end of your video, we will cut them out during editing, and it will let you settle before starting talking. </li>
                      <li> Save and upload your video preferably in MP4 or MOV format. It's easy to do! Go to the &ldquo;Consent and Submit Your Video&rdquo; section, open the form, then select: Upload your video here (.mp4 or .mov formats). </li>
                    </ul>
                  </b-col>
                </b-row>
                <b-row v-else-if="$i18n.locale === 'fr'">
                  <b-col cols="12">
                    <ul>
                      <li>Durée maximale de 5 minutes. Visez 2 à 3 minutes.</li>
                      <li> Si vous êtes bilingue. Produisez deux vidéos. L’une en français et l’autres en anglais. Ne passez pas d’une langue à l’autre dans une même vidéo. </li>
                      <li> Si vous parlez une langue autochtone, n’hésitez pas à nous saluer dans votre langue. Si vous ajoutez une phrase ou deux dans une langue autochtone, veuillez, s’il-vous-plaît, la ou les traduire en anglais et/ou en français. </li>
                      <li> Soyez naturel, debout devant la caméra (en mode «&ThinSpace;<span lang="en">stand up</span>&ThinSpace;» si possible) et livrez votre histoire ou votre témoignage en regardant directement la caméra. Soyez naturel&nbsp;: imaginez que vous parlez à un collègue ou un ami. </li>
                      <li> Pour les plus expérimenté, libre à vous d’ajouter du visuel pertinent, de qualité et dégagé de droit. N’oubliez-pas, votre témoignage prime sur les effets visuels. </li>
                      <li> N’ajoutez pas de musique. Elle n’est sans doute pas dégagée de droit. </li>
                      <li> Assurez-vous de laisser quelques secondes excédentaires présentes au début et à la fin de votre vidéo, nous les couperons au montage, et cela vous permettra d’être à l’aise. </li>
                      <li> Sauvegardez et téléversez votre vidéo préférablement en format MP4 ou encore en format MOV. La man&oelig;uvre est simple! Allez dans la section «&ThinSpace;Consentez et soumettez votre vidéo&ThinSpace;», ouvrez le formulaire, puis sélectionnez: Téléversez votre vidéo ici (formats .mp4 ou .mov). </li>
                    </ul>
                  </b-col>
                </b-row>
              </template>
            </accordion>
            <accordion id="contribute_acc_3" accordion="contribute_acc_group_1">
              <template v-slot:title>{{ $t("contribute_acc_3_title")
                }}
                <!-- <sup><a href="#fn" :title="$t('footnote')" id="fn-rf" tabindex="0" @click.stop="fnClick">*</a></sup>--></template>
              <template v-slot:content>
                <b-row v-if="$i18n.locale === 'en'" align-h="center">
                  <b-col cols="12" md="10" class="text-center">
                    <p style="font-size: 1.1rem; font-weight: 500"> To submit a video, fill-in the form below. </p>
                    <p style="margin-bottom: 30px">
                      <b-button tag="a" role="button" target="_blank" href="https://airtable.com/shrAkSB37clUBeQWY">{{ $t("submit") }}</b-button>
                    </p>
                    <p> The information in this form is being collected under the authority of paragraph 4(f) of the <external link="https://laws-lois.justice.gc.ca/eng/acts/C-10.13/page-1.html" name="the Canada School of Public Service Act">Canada School of Public Service Act</external>. Your personal information is protected under the <external link="https://lois-laws.justice.gc.ca/eng/acts/P-21/index.html" name="the Privacy Act">Privacy Act</external>. For more information, please refer to the School's <external link="https://www.csps-efpc.gc.ca/termsandconditions/index-eng.aspx" name="the School's Privacy Notice">Privacy Notice</external>. </p>
                  </b-col>
                </b-row>
                <b-row v-else-if="$i18n.locale === 'fr'" align-h="center">
                  <b-col cols="12" md="10" class="text-center">
                    <p style="font-size: 1.1rem; font-weight: 500"> Pour soumettre une vidéo, remplissez le formulaire ci-dessous. </p>
                    <p style="margin-bottom: 30px">
                      <b-button tag="a" role="button" target="_blank" href="https://airtable.com/shrYEYGseP1jlumFG">{{ $t("submit") }}</b-button>
                    </p>
                    <p> Les renseignements personnels dans ce formulaire sont recueillis en vertu de l'alinéa 4(f) de la <external link="http://laws-lois.justice.gc.ca/fra/lois/C-10.13/page-1.html" name="la Loi sur l’École de la fonction publique du Canada">Loi sur l’École de la fonction publique du Canada</external> Vos renseignements personnels sont protégés en vertu de la <external link="https://lois-laws.justice.gc.ca/fra/lois/P-21/index.html" name="la Loi sur la protection des renseignements personnels">Loi sur la protection des renseignements personnels</external>. Pour en savoir davantage, veuillez consulter l’<external link="https://www.csps-efpc.gc.ca/termsandconditions/index-fra.aspx" name="l'Avis de confidentialité de l'École">Avis de confidentialité de l'École</external>. </p>
                  </b-col>
                </b-row>
              </template>
            </accordion>
          </div>

          <p class="spacing-left" id="fn" tabindex="0" style="margin-top: 15px">
            <!--<sup>
              <a href="#fn-rf" :title="$t('footnote_referer')">* <span class="sr-only">{{ $t("footnote_referer") }}</span></a>
            </sup>-->
            <sup>*</sup>{{ $t("contribute_footnote") }} <a :href="
                'mailto:ils-saqa@csps-efpc.gc.ca?subject=' +
                $t('helpRequest').replace(/\s/g, '%20') +
                $t('title')
                  .replace(/(<([^>]+)>)/gi, '')
                  .replace(/&nbsp;/g, ' ')
                  .replace(/\s/g, '%20')
              " target="_blank">ils-saqa@csps-efpc.gc.ca</a>. </p>
          
          <h3>{{ $t("contribute_subtitle_2") }}</h3>
          
          <div role="tablist" class="acc-wrapper">
            <accordion id="contribute_acc_4" accordion="contribute_acc_group_2">
              <template v-slot:title>{{
                $t("contribute_acc_4_title")
              }}</template>
              <template v-slot:content>
                <b-row v-if="$i18n.locale === 'en'">
                  <b-col cols="12">
                    <p>Easy recipe to tell the story in a simple way:</p>
                    <ul>
                      <li>HELLO Hello, my name is&hellip;</li>
                      <li>WHAT: subject of the video</li>
                      <li>When:</li>
                      <li>WHY: reason for choice</li>
                      <li>HOW:</li>
                      <li> Consequences: positive impacts, and challenges of the initiative </li>
                      <li>Reflection: from this experience I think&hellip;</li>
                      <li>Closing: my hope is&hellip; Thank you.</li>
                    </ul>
                  </b-col>
                </b-row>
                <b-row v-else-if="$i18n.locale === 'fr'">
                  <b-col cols="12">
                    <p> Recette facile pour raconter en toute simplicité&nbsp;: </p>
                    <ul>
                      <li>SALUTATION Bonjour, mon nom est&hellip;</li>
                      <li>QUOI&nbsp;: sujet de la vidéo</li>
                      <li>Quand&nbsp;:</li>
                      <li>POURQUOI&nbsp;: raison du choix</li>
                      <li>Comment&nbsp;:</li>
                      <li> Conséquences&nbsp;: impacts positifs, et défis de l’initiative </li>
                      <li> Réflexion&nbsp;: de cette expérience je pense que&hellip; </li>
                      <li>Clôture&nbsp;: mon espoir est&hellip; Merci.</li>
                    </ul>
                  </b-col>
                </b-row>
              </template>
            </accordion>
            <accordion id="contribute_acc_5" accordion="contribute_acc_group_2">
              <template v-slot:title>{{
                $t("contribute_acc_5_title")
              }}</template>
              <template v-slot:content>
                <b-row>
                  <b-col cols="12" v-if="$i18n.locale === 'en'">
                    <p> Here are four factors to keep in mind when recording your video: </p>
                    <ul class="guidelines-list">
                      <li>Framing</li>
                      <li>Stability</li>
                      <li>Lighting</li>
                      <li>Sound</li>
                    </ul>
                    <p> Get these factors right, and your video will look better, sound better, and be more enjoyable for viewers. </p>
                  </b-col>
                  <b-col cols="12" v-else-if="$i18n.locale === 'fr'">
                    <p> Voici 4 facteurs à tenir compte pour enregistrer vos vidéos&nbsp;: </p>
                    <ul class="guidelines-list">
                      <li>Cadrage</li>
                      <li>Stabilité</li>
                      <li>Éclairage</li>
                      <li>Son</li>
                    </ul>
                    <p> Appliquez ces conseils et votre vidéo paraîtra mieux, pourvu d’un son de qualité et sera plus agréable à regarder. </p>
                  </b-col>
                </b-row>
                <b-row style="margin-top: 50px">
                  <b-col cols="12" lg="8" v-if="$i18n.locale === 'en'">
                    <h4>Framing</h4>
                    <ul>
                      <li> Position your camera horizontally (not vertically). </li>
                      <li> Use the back camera of your mobile phone, as it is of higher quality than the front camera (used for selfies). </li>
                      <li> Position the person being recorded to one side or the other, not right in the centre. </li>
                      <li> Try to be at eye level with the person being recorded. </li>
                      <li> The subject should <strong>not be too far away</strong>. You want to be able to see facial expressions and a get a clear sound. The subject <strong>should not be too close either</strong>. This will prevent cutting off part of the speaker’s face and will give you room to display subtitles. </li>
                    </ul>
                  </b-col>
                  <b-col cols="12" lg="8" v-else-if="$i18n.locale === 'fr'">
                    <h4>Cadrage</h4>
                    <ul>
                      <li> Positionnez votre camera à l’horizontal (pas à la vertical) </li>
                      <li> Utilisez la caméra arrière de votre appareil. Elle est de meilleure qualité que votre camera avant (utilisée pour les autoportraits). </li>
                      <li> Positionner la personne à filmer un peu plus à gauche ou à droite de l’écran, et non au centre. </li>
                      <li> Essayez de placer la caméra à la hauteur des yeux de votre sujet. </li>
                      <li>
                        <strong>Ne placez pas la personne trop loin</strong> pour bien voir l'expression du visage et obtenir un son clair (surtout en l’absence de microphone). <strong>Pas trop près non plus</strong> pour éviter de couper une partie du visage de la personne et aussi pour laisser l’espace suffisant à l’ajout de sous-titres. </li>
                    </ul>
                  </b-col>
                  <b-col cols="12" lg="4">
                    <img class="img-fluid" style="border: 1px solid #333" src="~assets/jobaids/camera_orientation.jpg" :alt="$t('descFollows')" />
                    <imgDesc id="camera_orientation">
                      <p v-html="
                          $i18n.locale === 'en'
                            ? 'An image showing a smartphone in landscape orientation with the text “Standard Horizontal Camera, 16x9 aspect ratio! ‘Landscape Mode’” and a green checkmark, and a smartphone in portrait orientation with the text “Standard Vertical Camera, 9x16 aspect ratio, ‘Portrait Mode’” and a red X.'
                            : 'Une image montrant un téléphone intelligent en orientation paysage avec le texte «&ThinSpace;<span lang=\'en\'>Standard Horizontal Camera, 16x9 aspect ratio! “Landscape Mode”</span>&ThinSpace;» et un crochet vert ainsi qu\'un téléphone intelligent en orientation portrait avec le texte «&ThinSpace;<span lang=\'en\'>Standard Vertical Camera, 9x16 aspect ratio, “Portrait Mode”</span>&ThinSpace;» et un X rouge.'
                        "></p>
                    </imgDesc>
                    <img class="img-fluid" style="margin-top: 25px" src="~assets/jobaids/framing.jpg" :alt="$t('descFollows')" />
                    <imgDesc id="framing">
                      <p v-html="
                          $i18n.locale === 'en'
                            ? 'An image showing a photo of someone separated in thirds horizontally and vertically. The face of the person is aligned at the intersection of the left and top lines.'
                            : 'Une image montrant une photo de quelqu\'un séparée en tiers horizontallement et verticalement. Le visage de la personne est centré à l\'intersection des lignes de gauche et du haut.'
                        "></p>
                    </imgDesc>
                  </b-col>
                </b-row>
                <b-row style="margin-top: 50px">
                  <b-col cols="12" lg="7" v-if="$i18n.locale === 'en'">
                    <h4>Stability</h4>
                    <ul>
                      <li>Fix your camera or mobile phone to a tripod.</li>
                      <li> If you don’t have a tripod, try using a mobile phone holder on a desk, countertop or bookshelf, for example. </li>
                      <li> If the camera or mobile device is not at eye level, ask the subject to sit on a chair. </li>
                    </ul>
                  </b-col>
                  <b-col cols="12" lg="7" v-else-if="$i18n.locale === 'fr'">
                    <h4>Stabilité</h4>
                    <ul>
                      <li>Fixez votre appareil mobile sur un trépied.</li>
                      <li> Si vous n’avez pas de trépied, placez votre appareil mobile sur une étagère, un meuble surélevé comme par exemple un comptoir ou un bureau. </li>
                      <li> Si l’appareil n’est pas à la hauteur des yeux du sujet, demandez-lui de s’assoir sur une chaise </li>
                    </ul>
                  </b-col>
                </b-row>
                <b-row style="margin-top: 50px">
                  <b-col cols="12" lg="7" order-md="last" v-if="$i18n.locale === 'en'">
                    <h4>Lighting</h4>
                    <ul>
                      <li> Shaded outdoor areas or indoor locations with natural light are best. The lighting must face you. </li>
                      <li>Natural light is generally more flattering.</li>
                      <li> Try to find simple backgrounds (clean not busy) so that the speaker stands out nicely. </li>
                      <li> Stay away from direct sunlight, as it is harsh and can create strong shadows. </li>
                      <li> Avoid backlighting. This makes the subject look like a silhouette (a black shape with no detail). </li>
                    </ul>
                  </b-col>
                  <b-col cols="12" lg="7" order-md="last" v-else-if="$i18n.locale === 'fr'">
                    <h4>Éclairage</h4>
                    <ul>
                      <li> Les zones extérieures ombragées ou les endroits intérieurs avec de la lumière naturelle sont les meilleurs. L’éclairage doit vous faire face. </li>
                      <li> La lumière naturelle est généralement plus flatteuse. </li>
                      <li> Essayez de trouver des arrière-plans sobres (non chargés) pour que la personne s’y détache nettement. </li>
                      <li> Restez à l'écart de la lumière directe du soleil, car elle est dure et peut créer de fortes ombres. </li>
                      <li> Évitez les contre-jours, cela fait ressembler le sujet à une silhouette (forme noire sans détail). </li>
                    </ul>
                  </b-col>
                  <b-col cols="12" lg="5">
                    <img v-if="$i18n.locale === 'en'" class="img-fluid" src="~assets/jobaids/lighting_en.png" :alt="$t('descFollows')" />
                    <img v-if="$i18n.locale === 'fr'" class="img-fluid" src="~assets/jobaids/lighting_fr.png" :alt="$t('descFollows')" />
                    <imgDesc id="lighting">
                      <p v-html="
                          $i18n.locale === 'en'
                            ? 'Photo of someone photographed in front of a bright light source. The person is in a dark shadow and barely visible. A label on the photo reads “Don\'t do this.”'
                            : 'Une photo de quelqu\'un photographié devant une source de lumière vive. La personne est dans l\'ombre et presque invisible. Un texte est apposé sur la photo et se lit «&ThinSpace;À ne pas faire&ThinSpace;».'
                        "></p>
                    </imgDesc>
                  </b-col>
                </b-row>
                <b-row style="margin-top: 50px">
                  <b-col cols="12" lg="7" v-if="$i18n.locale === 'en'">
                    <h4>Sound</h4>
                    <ul>
                      <li>Clear sound is essential for communication.</li>
                      <li> Use the earbuds or headphones that plug into your mobile device. They have a microphone where the volume control is located, which positions the microphone close to the speaker. </li>
                      <li> Limit background noise as much as possible. For example, don’t stand beside a running air conditioner. </li>
                      <li> Try not to have the speaker hold any objects or paper, as this may create unwanted noise. </li>
                      <li> If you have a dedicated external microphone or a wireless mic, please use it. Just be aware of any unwanted background sounds. </li>
                    </ul>
                  </b-col>
                  <b-col cols="12" lg="7" v-else-if="$i18n.locale === 'fr'">
                    <h4>Son</h4>
                    <ul>
                      <li>Un son clair est nécessaire à la communication</li>
                      <li> Utilisez les oreillettes/écouteurs qui se branchent sur votre appareil mobile - ils sont dotés d'un micro à proximité du sujet. </li>
                      <li> Limitez autant que possible tout bruit de fond. Par exemple, ne vous tenez pas à côté d'un climatiseur en marche. </li>
                      <li> Évitez que la personne ne tienne des objets ou du papier, car cela peut créer des bruits indésirables </li>
                      <li> Si vous disposez d'un micro externe dédié à votre appareil ou d'un micro sans fil, veuillez l'utiliser. Faites simplement attention aux éventuels bruits de fond indésirables. Soyez créatif! </li>
                    </ul>
                  </b-col>
                </b-row>
              </template>
            </accordion>
            <accordion id="contribute_acc_6" accordion="contribute_acc_group_2">
              <template v-slot:title><span v-html="$t('contribute_acc_6_title')"></span></template>
              <template v-slot:content>
                <b-row>
                  <b-col cols="12" xl="8" v-if="$i18n.locale === 'en'">
                    <p> To film your testimonials with Microsoft Teams, there are several easy steps to follow. In summary, you need to: </p>
                    <ul>
                      <li> create a new &ldquo;private&rdquo; team with yourself as the only member; </li>
                      <li>start a meeting in your team;</li>
                      <li>proceed with the recording;</li>
                      <li> finally, upload your video and submit it via the online form. </li>
                    </ul>
                  </b-col>
                  <b-col cols="12" md="8" v-else-if="$i18n.locale === 'fr'">
                    <p> Pour filmer votre témoignage avec <span lang="en">Microsoft Teams</span>, il y a plusieurs étapes faciles à suivre. En résumé, il faut&nbsp;: </p>
                    <ul>
                      <li> créer une nouvelle équipe «&ThinSpace;privée&ThinSpace;» avec vous-même comme seul membre; </li>
                      <li>démarrer une réunion dans votre équipe;</li>
                      <li>procéder à l’enregistrement;</li>
                      <li> finalement, télécharger votre vidéo et la soumettre via le formulaire en ligne. </li>
                    </ul>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="12" xl="8">
                    <h4 style="margin-top: 3rem; margin-bottom: 2rem"> {{
                        $i18n.locale === "en"
                          ? "Illustrated and detailed step-by-step instructions"
                          : "Mode d’emploi illustré et détaillé par étape"
                      }} </h4>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="12" v-if="$i18n.locale === 'en'" style="margin-bottom: 15px">
                    <p class="step"> 1. Create a group with you as the only member. Select &ldquo;Teams&rdquo;. </p>
                  </b-col>
                  <b-col cols="12" v-else-if="$i18n.locale === 'fr'" style="margin-bottom: 15px">
                    <p class="step"> 1. Créez un groupe avec vous comme seul membre. Sélectionnez « Équipes ». </p>
                  </b-col>
                  <b-col cols="12" lg="2">
                    <img v-if="$i18n.locale === 'en'" class="img-fluid" src="~assets/jobaids/msteams_step-1_en.png" :alt="$t('descFollows')" />
                    <img v-if="$i18n.locale === 'fr'" class="img-fluid" src="~assets/jobaids/msteams_step-1_fr.png" :alt="$t('descFollows')" />
                    <imgDesc id="msteams_step-1">
                      <p v-html="
                          $i18n.locale === 'en'
                            ? 'Screenshot showing an arrow pointing to the “Teams” icon on Microsoft Teams.'
                            : 'Capture d\'écran illustrant une flèche qui pointe vers l\'icône «&ThinSpace;Équipes&ThinSpace;» sur <span lang=\'en\'>Microsoft Teams</span>.'
                        "></p>
                    </imgDesc>
                  </b-col>
                </b-row>
                <b-row style="margin-top: 100px">
                  <b-col cols="12" v-if="$i18n.locale === 'en'" style="margin-bottom: 15px">
                    <p class="step"> 2. Select &ldquo;Join or create a team&rdquo; at the bottom left of the screen. </p>
                  </b-col>
                  <b-col cols="12" v-else-if="$i18n.locale === 'fr'" style="margin-bottom: 15px">
                    <p class="step"> 2. Sélectionnez «&ThinSpace;Rejoindre ou créer une équipe&ThinSpace;» en bas à gauche de l’écran. </p>
                  </b-col>
                  <b-col cols="12" lg="8">
                    <img v-if="$i18n.locale === 'en'" class="img-fluid" src="~assets/jobaids/msteams_step-2_en.png" :alt="$t('descFollows')" />
                    <img v-if="$i18n.locale === 'fr'" class="img-fluid" src="~assets/jobaids/msteams_step-2_fr.png" :alt="$t('descFollows')" />
                    <imgDesc id="msteams_step-2">
                      <p v-html="
                          $i18n.locale === 'en'
                            ? 'Screenshot showing an arrow pointing to the “Join or Create a Team” item in the left hand menu of Microsoft Teams.'
                            : 'Capture d\'écran qui pointe à l\'aide d\'une flèche l\'item «&ThinSpace;Rejoindre ou créer une équipe&ThinSpace;» dans le menu à gauche de <span lang=\'en\'>Microsoft Teams</span>.'
                        "></p>
                    </imgDesc>
                  </b-col>
                </b-row>
                <b-row style="margin-top: 100px">
                  <b-col cols="12" v-if="$i18n.locale === 'en'" style="margin-bottom: 15px">
                    <p class="step"> 3. Select &ldquo;Create team&rdquo; in the left box of the screen. </p>
                  </b-col>
                  <b-col cols="12" v-else-if="$i18n.locale === 'fr'" style="margin-bottom: 15px">
                    <p class="step"> 3. Sélectionnez «&ThinSpace;Créer une équipe&ThinSpace;» dans la boîte gauche de l’écran. </p>
                  </b-col>
                  <b-col cols="12" lg="4">
                    <img v-if="$i18n.locale === 'en'" class="img-fluid" src="~assets/jobaids/msteams_step-3_en.png" :alt="$t('descFollows')" />
                    <img v-if="$i18n.locale === 'fr'" class="img-fluid" src="~assets/jobaids/msteams_step-3_fr.png" :alt="$t('descFollows')" />
                    <imgDesc id="msteams_step-3">
                      <p v-html="
                          $i18n.locale === 'en'
                            ? 'Screenshot showing an arrow pointing to the “Create team” button in a Microsoft Teams window.'
                            : 'Capture d\'écran illustrant une flèche qui pointe vers l\'encadré «&ThinSpace;À partir de zéro&ThinSpace;» dans une fenêtre de <span lang=\'en\'>Microsoft Teams</span>.'
                        "></p>
                    </imgDesc>
                  </b-col>
                </b-row>
                <b-row style="margin-top: 100px">
                  <b-col cols="12" v-if="$i18n.locale === 'en'" style="margin-bottom: 15px">
                    <p class="step">4. Select &ldquo;From scratch.&rdquo;</p>
                  </b-col>
                  <b-col cols="12" v-else-if="$i18n.locale === 'fr'" style="margin-bottom: 15px">
                    <p class="step"> 4. Sélectionnez «&ThinSpace;À partir de zéro&ThinSpace;». </p>
                  </b-col>
                  <b-col cols="12" lg="6">
                    <img v-if="$i18n.locale === 'en'" class="img-fluid" src="~assets/jobaids/msteams_step-4_en.png" :alt="$t('descFollows')" />
                    <img v-if="$i18n.locale === 'fr'" class="img-fluid" src="~assets/jobaids/msteams_step-4_fr.png" :alt="$t('descFollows')" />
                    <imgDesc id="msteams_step-4">
                      <p v-html="
                          $i18n.locale === 'en'
                            ? 'Screenshot showing an arrow pointing to the “From scratch” box in a Microsoft Teams window.'
                            : 'Capture d\'écran illustrant une flèche qui pointe vers l\'encadré «&ThinSpace;Privée&ThinSpace;» dans une fenêtre de <span lang=\'en\'>Microsoft Teams</span>.'
                        "></p>
                    </imgDesc>
                  </b-col>
                </b-row>
                <b-row style="margin-top: 100px">
                  <b-col cols="12" v-if="$i18n.locale === 'en'" style="margin-bottom: 15px">
                    <p class="step">5. Select &ldquo;Private.&rdquo;</p>
                  </b-col>
                  <b-col cols="12" v-else-if="$i18n.locale === 'fr'" style="margin-bottom: 15px">
                    <p class="step"> 5. Choisissez «&ThinSpace;Privée&ThinSpace;». </p>
                  </b-col>
                  <b-col cols="12" lg="7">
                    <img v-if="$i18n.locale === 'en'" class="img-fluid" src="~assets/jobaids/msteams_step-5_en.png" :alt="$t('descFollows')" />
                    <img v-if="$i18n.locale === 'fr'" class="img-fluid" src="~assets/jobaids/msteams_step-5_fr.png" :alt="$t('descFollows')" />
                    <imgDesc id="msteams_step-5">
                      <p v-html="
                          $i18n.locale === 'en'
                            ? 'Screenshot showing an arrow pointing to the “Private” box in a Microsoft Teams window.'
                            : 'Capture d\'écran illustrant une flèche qui pointe vers l\'encadré «&ThinSpace;Privée&ThinSpace;» dans une fenêtre de <span lang=\'en\'>Microsoft Teams</span>.'
                        "></p>
                    </imgDesc>
                  </b-col>
                </b-row>
                <b-row style="margin-top: 100px">
                  <b-col cols="12" v-if="$i18n.locale === 'en'" style="margin-bottom: 15px">
                    <p class="step">6. Give your team a name.</p>
                  </b-col>
                  <b-col cols="12" v-else-if="$i18n.locale === 'fr'" style="margin-bottom: 15px">
                    <p class="step">6. Donnez un nom à votre équipe.</p>
                  </b-col>
                  <b-col cols="12" lg="7">
                    <img v-if="$i18n.locale === 'en'" class="img-fluid" src="~assets/jobaids/msteams_step-6_en.png" :alt="$t('descFollows')" />
                    <img v-if="$i18n.locale === 'fr'" class="img-fluid" src="~assets/jobaids/msteams_step-6_fr.png" :alt="$t('descFollows')" />
                    <imgDesc id="msteams_step-6">
                      <p v-html="
                          $i18n.locale === 'en'
                            ? 'Screenshot showing the “Give your team a name” window.'
                            : 'Capture d\'écran illustrant la fenêtre «&ThinSpace;Donnez un nom à votre équipe&ThinSpace;».'
                        "></p>
                    </imgDesc>
                  </b-col>
                </b-row>
                <b-row style="margin-top: 100px">
                  <b-col cols="12" v-if="$i18n.locale === 'en'" style="margin-bottom: 15px">
                    <p class="step"> 7. Then your new group will appear in the bottom left corner of the screen. </p>
                  </b-col>
                  <b-col cols="12" v-else-if="$i18n.locale === 'fr'" style="margin-bottom: 15px">
                    <p class="step"> 7. Puis votre nouveau groupe s’affichera en bas à gauche de l’écran. </p>
                  </b-col>
                  <b-col cols="12" lg="6">
                    <img v-if="$i18n.locale === 'en'" class="img-fluid" src="~assets/jobaids/msteams_step-7_en.png" :alt="$t('descFollows')" />
                    <img v-if="$i18n.locale === 'fr'" class="img-fluid" src="~assets/jobaids/msteams_step-7_fr.png" :alt="$t('descFollows')" />
                    <imgDesc id="msteams_step-7">
                      <p v-html="
                          $i18n.locale === 'en'
                            ? 'Screenshot showing an arrow pointing to the spot where your new team is housed in the left-hand menu of Microsoft Teams.'
                            : 'Capture d\'écran illustrant une flèche qui pointe vers l\'endroit où se loge votre nouvelle équipe dans le menu à gauche de <span lang=\'en\'>Microsoft Teams</span>.'
                        "></p>
                    </imgDesc>
                  </b-col>
                </b-row>
                <b-row style="margin-top: 100px">
                  <b-col cols="12" v-if="$i18n.locale === 'en'" style="margin-bottom: 15px">
                    <p class="step"> 8. To register, select the camera: &ldquo;Meet&rdquo;. </p>
                  </b-col>
                  <b-col cols="12" v-else-if="$i18n.locale === 'fr'" style="margin-bottom: 15px">
                    <p class="step"> 8. Pour vous enregistrer, sélectionnez la caméra&nbsp;: «&ThinSpace;Démarrer une réunion&ThinSpace;». </p>
                  </b-col>
                  <b-col cols="12" lg="6">
                    <img v-if="$i18n.locale === 'en'" class="img-fluid" src="~assets/jobaids/msteams_step-8_en.png" :alt="$t('descFollows')" />
                    <img v-if="$i18n.locale === 'fr'" class="img-fluid" src="~assets/jobaids/msteams_step-8_fr.png" :alt="$t('descFollows')" />
                    <imgDesc id="msteams_step-8">
                      <p v-html="
                          $i18n.locale === 'en'
                            ? 'Screenshot showing an arrow pointing to the “Meet” tab.'
                            : 'Capture d\'écran illustrant une flèche qui pointe vers l\'onglet «&ThinSpace;Démarrer une réunion&ThinSpace;».'
                        "></p>
                    </imgDesc>
                  </b-col>
                </b-row>
                <b-row style="margin-top: 100px">
                  <b-col cols="12" v-if="$i18n.locale === 'en'" style="margin-bottom: 15px">
                    <p class="step"> 9. The camera will open and you will be on the screen. To start recording, select the three dots at the top of the screen. </p>
                  </b-col>
                  <b-col cols="12" v-else-if="$i18n.locale === 'fr'" style="margin-bottom: 15px">
                    <p class="step"> 9. La caméra s’ouvrira et vous serez à l’écran. Pour commencer l’enregistrement, sélectionnez les trois points en haut de l’écran. </p>
                  </b-col>
                  <b-col cols="12" lg="7">
                    <img v-if="$i18n.locale === 'en'" class="img-fluid" src="~assets/jobaids/msteams_step-9_en.png" :alt="$t('descFollows')" />
                    <img v-if="$i18n.locale === 'fr'" class="img-fluid" src="~assets/jobaids/msteams_step-9_fr.png" :alt="$t('descFollows')" />
                    <imgDesc id="msteams_step-9">
                      <p v-html="
                          $i18n.locale === 'en'
                            ? 'Screenshot showing an arrow pointing to the three dots icon at the top of the Microsoft Teams menu screen.'
                            : 'Capture d\'écran illustrant une flèche qui pointe vers l\'icône des trois points en haut de l\'écran du menu de <span lang=\'en\'>Microsoft Teams</span>.'
                        "></p>
                    </imgDesc>
                  </b-col>
                </b-row>
                <b-row style="margin-top: 100px">
                  <b-col cols="12" v-if="$i18n.locale === 'en'" style="margin-bottom: 15px">
                    <p class="step"> 10. This menu will open. Select &ldquo;Start recording.&rdquo; </p>
                  </b-col>
                  <b-col cols="12" v-else-if="$i18n.locale === 'fr'" style="margin-bottom: 15px">
                    <p class="step"> 10. Ce menu s’ouvrira. Sélectionnez «&ThinSpace;Démarrer l’enregistrement&ThinSpace;». </p>
                  </b-col>
                  <b-col cols="12" lg="3">
                    <img v-if="$i18n.locale === 'en'" class="img-fluid" src="~assets/jobaids/msteams_step-10_en.png" :alt="$t('descFollows')" />
                    <img v-if="$i18n.locale === 'fr'" class="img-fluid" src="~assets/jobaids/msteams_step-10_fr.png" :alt="$t('descFollows')" />
                    <imgDesc id="msteams_step-10">
                      <p v-html="
                          $i18n.locale === 'en'
                            ? 'Screenshot showing a drop-down menu with an arrow pointing to the “Start recording” item.'
                            : 'Capture d\'écran illustrant un menu déroulant avec une flèche qui pointe vers l\'item «&ThinSpace;Démarrer l\'enregistrement&ThinSpace;».'
                        "></p>
                    </imgDesc>
                  </b-col>
                </b-row>
                <b-row style="margin-top: 100px">
                  <b-col cols="12" v-if="$i18n.locale === 'en'" style="margin-bottom: 15px">
                    <p class="step"> 11. Allow about 5 seconds for the recording to begin. You are recording when a red dot and the written indication &ldquo;You are recording&hellip;&rdquo; appear at the top of the screen. </p>
                  </b-col>
                  <b-col cols="12" v-else-if="$i18n.locale === 'fr'" style="margin-bottom: 15px">
                    <p class="step"> 11. Comptez un délai d’environ 5 secondes avant que l’enregistrement commence. Vous enregistrez lorsqu’un point rouge ainsi que l’indication écrite «&ThinSpace;Vous enregistrez&hellip;&ThinSpace;» apparaissent en haut de l’écran. </p>
                  </b-col>
                  <b-col cols="12" lg="7">
                    <img v-if="$i18n.locale === 'en'" class="img-fluid" src="~assets/jobaids/msteams_step-11_en.png" :alt="$t('descFollows')" />
                    <img v-if="$i18n.locale === 'fr'" class="img-fluid" src="~assets/jobaids/msteams_step-11_fr.png" :alt="$t('descFollows')" />
                    <imgDesc id="msteams_step-11">
                      <p v-html="
                          $i18n.locale === 'en'
                            ? 'Screenshot showing two arrows pointing to the red button and to the written indication “You\'re recording” on Microsoft Teams.'
                            : 'Capture d\'écran illustrant deux flèches qui pointent vers le bouton rouge et vers l\'indication écrite «&ThinSpace;Vous enregistrez&ThinSpace;» sur <span lang=\'en\'>Microsoft Teams</span>.'
                        "></p>
                    </imgDesc>
                  </b-col>
                </b-row>
                <b-row style="margin-top: 100px">
                  <b-col cols="12" v-if="$i18n.locale === 'en'" style="margin-bottom: 15px">
                    <p class="step"> 12. To stop recording, select the same three dots at the top of the screen and choose &ldquo;Stop Recording.&rdquo; </p>
                  </b-col>
                  <b-col cols="12" v-else-if="$i18n.locale === 'fr'" style="margin-bottom: 15px">
                    <p class="step"> 12. Pour arrêter l’enregistrement, sélectionnez les mêmes trois points en haut de l’écran et choisissez «&ThinSpace;Arrêter l’enregistrement&ThinSpace;». </p>
                  </b-col>
                  <b-col cols="12" lg="3">
                    <img v-if="$i18n.locale === 'en'" class="img-fluid" src="~assets/jobaids/msteams_step-12_en.png" :alt="$t('descFollows')" />
                    <img v-if="$i18n.locale === 'fr'" class="img-fluid" src="~assets/jobaids/msteams_step-12_fr.png" :alt="$t('descFollows')" />
                    <imgDesc id="msteams_step-12">
                      <p v-html="
                          $i18n.locale === 'en'
                            ? 'Screenshot showing two arrows pointing to the three dots and to the “Stop recording” item in the Microsoft Teams drop-down menu.'
                            : 'Capture d\'écran illustrant deux flèches qui pointent vers les trois points et vers l\'item «&ThinSpace;Arrêter l\'enregistrement&ThinSpace;» du menu déroulant sur Microsoft Teams.'
                        "></p>
                    </imgDesc>
                  </b-col>
                </b-row>
                <b-row style="margin-top: 100px">
                  <b-col cols="12" v-if="$i18n.locale === 'en'" style="margin-bottom: 15px">
                    <p class="step"> 13. To access the video recording link, open your chat box. </p>
                  </b-col>
                  <b-col cols="12" v-else-if="$i18n.locale === 'fr'" style="margin-bottom: 15px">
                    <p class="step"> 13. Pour accéder au lien de l’enregistrement vidéo, ouvrez votre boîte de conversation. </p>
                  </b-col>
                  <b-col cols="12" lg="5">
                    <img v-if="$i18n.locale === 'en'" class="img-fluid" src="~assets/jobaids/msteams_step-13_en.png" :alt="$t('descFollows')" />
                    <img v-if="$i18n.locale === 'fr'" class="img-fluid" src="~assets/jobaids/msteams_step-13_fr.png" :alt="$t('descFollows')" />
                    <imgDesc id="msteams_step-13">
                      <p v-html="
                          $i18n.locale === 'en'
                            ? 'Screenshot showing two arrows pointing to the chat tab and to the box that includes the video link on Microsoft Teams.'
                            : 'Capture d\'écran illustrant deux flèches qui pointent vers l\'onglet de clavardage et vers l\'encadré qui inclut le lien de la vidéo sur <span lang=\'en\'>Microsoft Teams</span>.'
                        "></p>
                    </imgDesc>
                  </b-col>
                </b-row>
                <b-row style="margin-top: 100px">
                  <b-col cols="12" v-if="$i18n.locale === 'en'" style="margin-bottom: 15px">
                    <p class="step"> 14. To download your video, select &ldquo;Download&rdquo; from the menu at the top left of the screen. </p>
                  </b-col>
                  <b-col cols="12" v-else-if="$i18n.locale === 'fr'" style="margin-bottom: 15px">
                    <p class="step"> 14. Pour télécharger votre vidéo, sélectionnez «&ThinSpace;<span lang="en">Download</span>&ThinSpace;», dans le menu en haut à gauche de l’écran. </p>
                  </b-col>
                  <b-col cols="12" lg="7">
                    <img v-if="$i18n.locale === 'en'" class="img-fluid" src="~assets/jobaids/msteams_step-14_en.png" :alt="$t('descFollows')" />
                    <img v-if="$i18n.locale === 'fr'" class="img-fluid" src="~assets/jobaids/msteams_step-14_fr.png" :alt="$t('descFollows')" />
                    <imgDesc id="msteams_step-14">
                      <p v-html="
                          $i18n.locale === 'en'
                            ? 'Screenshot showing an arrow pointing to the “Download” tab at the top of the screen on Microsoft Teams.'
                            : 'Capture d\'écran illustrant une flèche qui pointe vers l\'onglet «&ThinSpace;Download&ThinSpace;» en haut de l\'écran sur <span lang=\'en\'>Microsoft Teams</span>.'
                        "></p>
                    </imgDesc>
                  </b-col>
                </b-row>
                <b-row style="margin-top: 100px">
                  <b-col cols="12" v-if="$i18n.locale === 'en'" style="margin-bottom: 15px">
                    <p class="step"> 15. Your video (MP4 file) is stored on your computer in your &ldquo;Downloads&rdquo; folder. </p>
                  </b-col>
                  <b-col cols="12" v-else-if="$i18n.locale === 'fr'" style="margin-bottom: 15px">
                    <p class="step"> 15. Votre vidéo (fichier MP4) est logé sur votre ordinateur dans votre dossier «&ThinSpace;Téléchargements&ThinSpace;». </p>
                  </b-col>
                  <b-col cols="12" lg="8">
                    <img v-if="$i18n.locale === 'en'" class="img-fluid" src="~assets/jobaids/msteams_step-15_en.png" :alt="$t('descFollows')" />
                    <img v-if="$i18n.locale === 'fr'" class="img-fluid" src="~assets/jobaids/msteams_step-15_fr.png" :alt="$t('descFollows')" />
                    <imgDesc id="msteams_step-15">
                      <p v-html="
                          $i18n.locale === 'en'
                            ? 'Screenshot showing three arrows pointing first to the “Downloads” folder on a desktop, then to the location where to find a video and finally to the type of file created.'
                            : 'Capture d\'écran illustrant trois flèches qui pointent d\'abord vers le dossier «&ThinSpace;Téléchargements&ThinSpace;» sur un bureau d\'ordinateur, puis sur l\'emplacement où retrouver une vidéo et enfin sur le type de fichier créé.'
                        "></p>
                    </imgDesc>
                  </b-col>
                </b-row>
                <b-row style="margin-top: 100px">
                  <b-col cols="12" v-if="$i18n.locale === 'en'">
                    <p class="step"> 16. Upload your video to the Canada School of Public Service's &ldquo;Video Testimonials: Indigenous Employees&rdquo; video webpage via the following 3 steps: </p>
                  </b-col>
                  <b-col cols="12" v-else-if="$i18n.locale === 'fr'">
                    <p class="step"> 16. Téléversez votre vidéo sur la page web vidéo «&ThinSpace;Témoignages vidéo&nbsp;: employé&middot;es autochtones&ThinSpace;» de l’École de la fonction publique du Canada via les 3 étapes suivantes&nbsp;: </p>
                  </b-col>
                </b-row>
                <b-row style="margin-top: 15px">
                  <b-col cols="12" lg="4">
                    <img v-if="$i18n.locale === 'en'" class="img-fluid" src="~assets/jobaids/msteams_step-16a_en.png" :alt="$t('descFollows')" />
                    <img v-if="$i18n.locale === 'fr'" class="img-fluid" src="~assets/jobaids/msteams_step-16a_fr.png" :alt="$t('descFollows')" />
                    <imgDesc id="msteams_step-16a">
                      <p v-html="
                          $i18n.locale === 'en'
                            ? 'Screenshot showing the title of the “Video Testimonials: Indigenous Employees” webpage with an arrow pointing to the “Submit Your Video Testimonial” button.'
                            : 'Capture d\'écran illustrant le titre de la page web «&ThinSpace;Témoignages vidéo&nbsp;: employé&middot;es autochtones&ThinSpace;» avec une flèche qui pointe vers le bouton «&ThinSpace;Soumettez votre témoignage vidéo&ThinSpace;».'
                        "></p>
                    </imgDesc>
                  </b-col>
                  <b-col cols="12" lg="4">
                    <img v-if="$i18n.locale === 'en'" class="img-fluid" src="~assets/jobaids/msteams_step-16b_en.png" :alt="$t('descFollows')" />
                    <img v-if="$i18n.locale === 'fr'" class="img-fluid" src="~assets/jobaids/msteams_step-16b_fr.png" :alt="$t('descFollows')" />
                    <imgDesc id="msteams_step-16b">
                      <p v-html="
                          $i18n.locale === 'en'
                            ? 'Screenshot of the “How Do I Proceed?” instructions window with an arrow pointing to the “Consent and Submit Your Video” accordion menu.'
                            : 'Capture d\'écran de la fenêtre de directives «&ThinSpace;Comment dois-je procéder?&ThinSpace;» avec une flèche qui pointe vers le menu accordéon «&ThinSpace;Consentez et soumettez votre vidéo&ThinSpace;».'
                        "></p>
                    </imgDesc>
                  </b-col>
                  <b-col cols="12" lg="4">
                    <img v-if="$i18n.locale === 'en'" class="img-fluid" src="~assets/jobaids/msteams_step-16c_en.png" :alt="$t('descFollows')" />
                    <img v-if="$i18n.locale === 'fr'" class="img-fluid" src="~assets/jobaids/msteams_step-16c_fr.png" :alt="$t('descFollows')" />
                    <imgDesc id="msteams_step-16c">
                      <p v-html="
                          $i18n.locale === 'en'
                            ? 'Screenshot showing the section that says “Upload your video here” with an arrow pointing to the “Attach file” button.'
                            : 'Capture d\'écran illustrant la section qui stipule «&ThinSpace;Téléversez votre vidéo ici&ThinSpace;» avec une flèche qui pointe vers le bouton «&ThinSpace;<span lang=\'en\'>Attach file</span>&ThinSpace;».'
                        "></p>
                    </imgDesc>
                  </b-col>
                </b-row>
              </template>
            </accordion>
          </div>
        </main>
      </b-modal>
      
      <b-modal id="warning" :title="$t('warning-title')" centered cancel-disabled :header-close-label="$t('close')" :ok-title="$t('close')" ok-only size="xl" title-tag="h2">
        <main>
          <div v-if="$i18n.locale === 'en'">
            <h3>Mental Health and Well-Being Resources</h3>
            <p> We recognize that some testimonials may trigger strong emotional responses. If you need help or support here is a list of resources available to you. </p>           
            <h4>Indigenous Resources</h4>
            <p> The <a href="https://fpwc.ca/">First Peoples Wellness Circle</a> is a national not-for-profit corporation governed and managed by Indigenous leaders and exists to improve the lives of Canada’s First Peoples by addressing healing, wellness and other mental health challenges.</p>
            <p>The <a href="https://www.sac-isc.gc.ca/eng/1576089519527/1576089566478">Hope for Wellness Help Line</a> offers immediate help to all Indigenous Peoples across Canada. It is available 24 hours a day, 7 days a week. Call the toll-free Help Line or connect to the online chat at <a href="hopeforwellness.ca">opeforwellness.ca/</a>. Telephone and online counselling are available in English and French. On request, telephone counselling is also available in Cree, Ojibway and Inuktitut: <strong>1-855-242-3310.</strong>
            </p>
            <p> The <a href="https://www.irsss.ca/">Indian Residential School Survivors Society</a> 24/7 crisis line provides support to anyone experiencing pain or distress as a result of their residential school experience: <strong>1-866-925-4419.</strong>
            </p>
            <p><a href="https://www.itk.ca/">Inuit Tapiriit Kanatami</a> works to improve the health and well-being of Inuit in Canada through research, advocacy, public outreach and education.</p>
            <p>The <a href="http://nunavuthelpline.ca/">Kamatsiaqtut Nunavut Helpline</a> is a toll-free, anonymous, confidential 24/7 service staffed by trained volunteers: 1-800-265-3333.</p>
            <p>The <a href="https://www.mmiwg-ffada.ca/contact/">Support Line of the National Inquiry into Missing and Murdered Indigenous Women and Girls</a> is an independent, national, 24/7 toll-free service available to anyone who requires assistance. Services are available in English and French: <strong>1-844-413-6649.</strong></p>
            <p>The <a href="https://nafc.ca/?lang=en">National Association of Friendship Centres</a> provides culturally relevant programs and services for Indigenous Peoples living in urban centres across Canada. It works on a range of issues, including health, housing, youth, justice and international development.</p>
            <p>The <a href="https://stbbi.nwac.ca/">Native Women's Association of Canada</a> offers support and helps build resiliency. Elders are available Monday to Friday, from 9 to 11 am, and from 1 to 3 pm (eastern time): <strong>1-888-664-7808.</strong>
            </p>
            <p><a href="http://www.talk4healing.com/about/">Talk4Healing provides</a> <strong>24/7</strong> phone, text and live chat counselling. Talk4Healing also provides support and resources for Indigenous women, by Indigenous women, all across Ontario. Services are fully grounded in Indigenous culture, wisdom and tradition and are available in the following languages: Oji-Cree, Cree, Algonquin, Inuktitut, Mohawk, Oneida, Odawa, Potawatomi, Micmac, Black Foot, Anishinaabe, Moose Cree, Swampy Cree and English: <strong>1-855-554-HEAL.</strong></p>
            <p>The <a href="https://thunderbirdpf.org/crisis-to-wellness/">Thunderbird Partnership Foundation</a> promotes a holistic approach to healing and wellness that values culture, respect, community, and compassion. The foundation’s top priority is developing a continuum of care that would be available to all Indigenous Peoples in Canada.</p>
            <p>Tsow-Tun Le Lum Crisis Line: <strong>1-888-403-3123</strong></p>
            <p>Ku-Us Crisis Line: <strong>1-800-588-8717</strong></p>
            <p>Métis Crisis Line: <strong>1-833-638-4722</strong></p>
            <p><a href="https://www.heretohelp.bc.ca/resources-0">Here to Help</a> <strong>1-800-588-8717</strong> (Indigenous residents of BC) </p>
            <p><a href="https://www.sac-isc.gc.ca/eng/1576090254932/1576090371511">Substance use treatment centres for First Nations and Inuit</a></p>
            <p><a href="https://www.sac-isc.gc.ca/eng/1581971225188/1581971250953">Indian Residential Schools Resolution Health Support Program</a></p>
            <p><a href="https://www.sac-isc.gc.ca/eng/1576441552462/1576441618847">Mental Health Counselling Benefits under the NI HB program</a></p>
            <p><a href="https://www.allianceon.org/aboriginal-health-access-centres">Indigenous Health Centres</a></p>
            <p><a href="https://wabano.com/">Wa ba no Centre</a></p>
            <p><a href="https://www.ottawaaboriginalcoalition.ca/">Ottawa Aboriginal Coalition</a></p>
            <p><a href="https://nativemontreal.com/">Native Montreal</a></p>
            <p><a href="https://www.wellnesstogether.ca/en-ca/indian-residential-schools-crisis-support/">Wellness Together Canada: Indian Residential Schools Crisis Support</a>
            </p>
            <h4>Other Resources</h4>
            <p>The <a href="https://cmha.ca/">Canadian Mental Health Association</a> is a nationwide organization that promotes mental health and supports people recovering from mental illness.</p>
            <p><a href="https://talksuicide.ca/">Crisis Services Canada</a> offers a toll-free, <strong>24/7</strong> service to anyone concerned about suicide. The service is available all year long. Whether you are suffering from a loss, worried about someone who may be having suicidal thoughts, or having suicidal thoughts yourself, their highly trained responders are there to provide support.</p>
            <p>Suicide Crisis Line: <strong>1-833-456-4566</strong></p>
            <p>Battered Women Support Services: <strong>1-855-687-1868</strong></p>
            <p><a href="https://www.octevaw-cocvff.ca/">Ottawa Coalition to End Violence Against Women</a></p>
            <p><a href="https://kidshelpphone.ca/">Kids Help Phone</a> is a <strong>24/7</strong> national service offering professional counselling, information, referrals and volunteer-led, text-based support to young people in both English and French.</p>
            <p><a href="https://sheltersafe.ca/">Shelter Safe</a> is an online resource for women and their children seeking safety from violence and abuse. </p>
            <p><a href="https://www.wellnesstogether.ca/en-CA">Wellness Together Canada</a> provides phone, video, and text counselling, information and videos on common mental health and substance use issues, wellness programs, and community and peer support. </p>
            
            <h4>Other Government of Canada Resources</h4>
            <p>The <a href="https://www.canada.ca/en/government/publicservice/wellness-inclusion-diversity-public-service/health-wellness-public-servants/mental-health-workplace.html">Center of Expertise on Mental Health in the Workplace</a> provides information about how the Government of Canada addresses mental health in the workplace and access to resources, tools and services for organizations, managers and employees. </p>
            <p>The <a href="https://www.canada.ca/en/health-canada/services/environmental-workplace-health/occupational-health-safety/employee-assistance-services/employee-assistance-program.html">Employee Assistance Program</a> (EAP) provides free short-term counselling for personal or work-related problems as well as crisis counselling. More than 80 federal departments and agencies receive their EAP services through Health Canada while other organizations provide this service internally or purchase it from the private sector. To find the service provider for your organization, please consult the <a href="https://www.canada.ca/en/government/publicservice/wellness-inclusion-diversity-public-service/employee-assistance-program.html">departmental listing</a>.</p>
            <p>The <a href="https://mentalhealthcommission.ca/">Mental Health Commission of Canada</a> leads the development and dissemination of innovative programs and tools to support the mental health and wellness of Canadians.</p>
            <p><a href="https://www.canada.ca/en/department-national-defence/services/benefits-military/military-mental-health.html">Mental Health Services for Canadian Armed Forces Members and Families</a></p>
            <p><a href="https://www.rcmp-grc.gc.ca/en/family-corner/mental-health-wellbeing-and-support">Mental Health Services Available to RCMP Employees</a></p>
            <p><a href="https://www.veterans.gc.ca/eng/health-support/mental-health-and-wellness">Mental Health Services Available to Veterans</a></p>
            <p><a href="https://www.canada.ca/en/public-health/services/bullying.html">Bullying</a></p>
            <p><a href="https://www.canada.ca/en/public-health/topics/violence-abuse.html">Violence and Abuse</a></p>
            <p>Feedback? Contact us. <br /> Indigenous Learning, Canada School of Public Service<br />Email: <a href="mailto:ils-saqa@csps-efpc.gc.ca">ils-saqa@csps-efpc.gc.ca</a></p>
          </div>
          <div v-if="$i18n.locale === 'fr'">
            <h3>Ressources sur la santé mentale et le mieux-être</h3>
            <p> Nous reconnaissons que certains témoignages peuvent vous affecter émotivement. Si vous avez besoin d’aide ou de soutien, voici une liste de ressources à votre disposition. </p>
            
            <h4>Ressources pour les Autochtones</h4>
            <p><a href="https://fpwc.ca/">First Peoples Wellness Circle</a> (anglais seulement) est une société nationale à but non lucratif, gouvernée et gérée par des dirigeants autochtones, qui a pour but d’améliorer la vie des Premières Nations au Canada en abordant la guérison, le mieux-être et d’autres questions de santé mentale.</p>
            <p>La <a href="https://www.sac-isc.gc.ca/fra/1576089519527/1576089566478">Ligne d’écoute d’espoir</a> offre une aide immédiate à tous les peuples autochtones au Canada. Elle est accessible en tout temps. Appelez la ligne d’écoute gratuite ou branchez-vous au clavardage en ligne à <a href="https://www.espoirpourlemieuxetre.ca/">espoirpourlemieuxetre.ca</a>. Les services de counseling par téléphone et en ligne sont disponibles en anglais et en français. Les services de counseling par téléphone sont aussi disponibles sur demande en cri, en ojibwé et en inuktitut : <strong>1-855-242-3310</strong>. </p>
            <p>La <a href="https://www.irsss.ca/">Indian Residential School Survivors Society</a> (anglais seulement) offre une ligne d’écoute téléphonique disponible en tout temps pour toute personne qui ressent de la douleur ou de la détresse à la suite de son expérience dans un pensionnat : <strong>1-866-925-4419</strong>. </p>
            <p><a href="https://www.itk.ca/">Inuit Tapiriit Kanatami</a> (anglais seulement) s’efforce d’améliorer la santé et le mieux-être des Inuits au Canada par la recherche, la défense des intérêts, la sensibilisation du public et l’éducation. </p>
            <p><a href="http://nunavuthelpline.ca/">Kamatsiaqtut Nunavut Helpline</a> (anglais seulement) est une ligne d’assistance disponible en tout temps, gratuite, anonyme, confidentielle et animée par des bénévoles qualifiés : 1-800-265-3333. </p>
            <p>La <a href="La Ligne de soutien pour l’Enquête nationale sur les femmes et les filles autochtones disparues et assassinées est un service indépendant, national et gratuit disponible en tout temps pour toute personne ayant besoin d’aide. Ce service est offert en anglais et en français : 1-844-413-6649.">Ligne de soutien pour l’Enquête nationale sur les femmes et les filles autochtones disparues et assassinées</a> est un service indépendant, national et gratuit disponible en tout temps pour toute personne ayant besoin d’aide. Ce service est offert en anglais et en français : 1-844-413-6649. </p>
            <p><a href="https://nafc.ca/?lang=fr">L’Association nationale des centres d’amitié</a> offre des programmes et des services culturellement pertinents aux populations autochtones vivant dans des centres urbains à travers le Canada. Elle intervient sur de nombreux domaines tels que la santé, le logement, la jeunesse, la justice et le développement international. </p>
            <p><a href="https://stbbi.nwac.ca/fr/">L’Association des femmes autochtones du Canada</a> (anglais seulement) offre un soutien et aide à renforcer la résilience. Des aînés sont disponibles du lundi au vendredi, de 9 h à 11 h (HE) et de 13 h à 15 h (HE) : 1-888-664-7808. </p>
            <p><a href="http://www.talk4healing.com/about/">Talk4Healing</a> (anglais seulement) offre un service de counseling en tout temps par téléphone, par texto et par clavardage en direct. Du soutien et des ressources sont également offerts aux femmes autochtones, par des femmes autochtones, dans tout l’Ontario. Ils sont entièrement ancrés dans la culture, la sagesse et la tradition autochtones et sont disponibles dans les langues suivantes : oji-cri, cri, algonquin, inuktitut, mohawk, oneida, odawa, potawatomi, micmac, blackfoot, anishinaabe, cri de la Moose, cri des marais et anglais : 1-855-554-HEAL. </p>
            <p> La <a href="https://thunderbirdpf.org/crisis-to-wellness/?lang=fr">Thunderbird Partnership Foundation</a> (bilingue) favorise une approche holistique de la guérison et du mieux-être qui valorise la culture, le respect, la communauté et la compassion. Sa priorité absolue est de développer un continuum de soins qui serait accessible à tous les peuples autochtones du Canada. (bilingue) </p>
            <p> Tsow-Tun Le Lum Crisis Line: <strong>1-888-403-3123</strong> (anglais seulement) </p>
            <p>Ku-Us Crisis Line: <strong>1-800-588-8717</strong> (en anglais)</p>
            <p>Métis Crisis Line: <strong>1-833-638-4722</strong> (en anglais)</p>
            <p><a href="https://www.heretohelp.bc.ca/resources-0">Here to Help</a> <strong>1-800-588-8717</strong> (Indigenous residents of BC – en anglais) </p>
            <p><a href="https://www.sac-isc.gc.ca/fra/1576090254932/1576090371511">Centre de traitement de la consommation problématique de substances pour les Premières Nations</a>
            </p>
            <p><a href="https://www.sac-isc.gc.ca/fra/1581971225188/1581971250953">Programme de soutien en santé : résolution des questions des pensionnats indiens</a>
            </p>
            <p><a href="https://www.sac-isc.gc.ca/fra/1576441552462/1576441618847">Prestations pour counseling en santé mentale</a>
            </p>
            <p><a href="https://www.allianceon.org/fr/CASSA">Centres d’accès aux services de santé pour les autochtones</a>
            </p>
            <p><a href="https://wabano.com/">Wa ba no Centre (en anglais)</a></p>
            <p><a href="https://www.ottawaaboriginalcoalition.ca/">Ottawa Aboriginal Coalition (en anglais)</a></p>
            <p><a href="https://www.ottawaaboriginalcoalition.ca/">Autochtone Montréal</a></p>

            <h4>Autres ressources</h4>
            <p><a href="https://cmha.ca/fr/">L’Association canadienne pour la santé mentale</a> est une organisation nationale qui favorise la santé mentale et soutient les personnes qui se remettent d’une maladie mentale. </p>
            <p><a href="https://talksuicide.ca/">Services de crises du Canada</a> offre un service gratuit en tout temps à toute personne concernée par le suicide. Ce service est disponible toute l’année. Que vous souffriez d’une perte, que vous vous inquiétiez pour quelqu’un qui pourrait avoir des pensées suicidaires ou que vous ayez vous-même des pensées suicidaires, des intervenants hautement qualifiés sont là pour vous apporter leur soutien. </p>
            <p><a href="https://parlonssuicide.ca/">Parlons suicide Canada</a> : <strong>1-833-456-4566</strong></p>
            <p><a href="https://jeunessejecoute.ca/?_ga=2.213908247.2092362813.1631628392-1168979117.1625595917">Jeunesse, J’écoute</a> est un service national disponible en tout temps et offrant aux jeunes des conseils professionnels, des informations et des orientations, ainsi qu’un soutien par clavardage assuré par des bénévoles, en anglais et en français. </p>
            <p><a href="https://hebergementfemmes.ca/">Hébergement femmes</a> est une ressource en ligne pour les femmes et leurs enfants qui cherchent à se protéger de la violence et des abus. </p>
            <p><a href="https://www.octevaw-cocvff.ca/page-daccueil">La coalition contre la violence faite aux femmes</a>
            </p>
            <p><a href="https://www.wellnesstogether.ca/fr-CA">Espace mieux-être Canada</a> fournit des conseils par téléphone, vidéo et texto, des informations et des vidéos sur les problèmes courants de santé mentale et de toxicomanie, des programmes de mieux-être et un soutien communautaire et par les pairs. </p>

            <h4>Autres ressources du gouvernement du Canada</h4>
            <p> Le <a href="https://www.canada.ca/fr/gouvernement/fonctionpublique/mieux-etre-inclusion-diversite-fonction-publique/sante-mieux-etre-fonctionnaires/sante-mentale-travail.html">Centre d’expertise pour la santé mentale en milieu de travail</a> fournit des renseignements sur la façon dont le gouvernement du Canada aborde la santé mentale en milieu de travail et donne accès à des ressources, des outils et des services pour les organisations, les gestionnaires et les employés. </p>
            <p><a href="https://www.canada.ca/fr/sante-canada/services/sante-environnement-milieu-travail/sante-securite-travail/service-aide-employes/programme-aide-employes.html">Le Programme d’aide aux employés</a> (PAE) offre gratuitement des conseils à court terme pour des problèmes personnels ou liés au travail, ainsi que des conseils en cas de crise. Plus de 80 ministères et organismes fédéraux reçoivent leurs services de PAE par l’entremise de Santé Canada, tandis que d’autres organisations offrent ce service à l’interne ou l’achètent du secteur privé. Pour trouver le fournisseur de services de votre organisation, consultez la <a href="https://www.canada.ca/fr/gouvernement/fonctionpublique/mieux-etre-inclusion-diversite-fonction-publique/programme-aide-employes.html">liste des ministères</a>. </p>
            <p> La <a href="https://commissionsantementale.ca/">Commission de la santé mentale du Canada</a> dirige l’élaboration et la diffusion de programmes et d’outils novateurs pour soutenir la santé mentale et le mieux-être des Canadiens et des Canadiennes. </p>
            <p><a href="https://www.canada.ca/fr/ministere-defense-nationale/services/avantages-militaires/sante-mentale-militaires.html">Services de santé mentale offerts aux membres des Forces armées canadiennes et à leur famille</a>
            </p>
            <p><a href="https://www.rcmp-grc.gc.ca/fr/coin-des-familles/sante-mentale-mieux-etre-et-soutien">Services de santé mentale offerts aux employés de la GRC</a></p>
            <p><a href="https://www.veterans.gc.ca/fra/health-support/mental-health-and-wellness">Services de santé mentale offerts aux anciens combattants</a></p>
            <p><a href="https://www.canada.ca/fr/sante-publique/services/intimidation.html">Intimidation</a></p>
            <p><a href="https://www.canada.ca/fr/sante-publique/sujets/violence-et-abus.html">Violence et abus</a></p>
            <p> Rétroaction? Contactez-nous.<br />Apprentissage autochtone, École de la fonction publique du Canada<br />Adresse courriel : <a href="mailto:ils-saqa@csps-efpc.gc.ca">ils-saqa@csps-efpc.gc.ca</a>
            </p>
          </div>
        </main>
      </b-modal>
      <!-- <b-modal id="partnership" :title="$t('partnership-label')" centered cancel-disabled :header-close-label="$t('close')" :ok-title="$t('close')" ok-only size="xl" title-tag="h2">
        <main>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate aperiam ratione accusantium esse beatae expedita in officiis quis doloremque odit deleniti debitis ipsam corporis laudantium, illum itaque ipsa quo incidunt suscipit vitae exercitationem atque. Eveniet reiciendis, et deserunt doloremque consectetur nemo distinctio corrupti accusantium blanditiis exercitationem, nam maiores officia corporis?</p>
        </main>
      </b-modal> -->
    </b-row>
  </b-container>
</template>

<script>
import accordion from "~/components/accordion.vue";
import ils from "~/components/ils.vue";
import VideoPlayer from "~/components/videoPlayer.vue";
import external from "~/components/external.vue";
import imgDesc from "~/components/imgDesc.vue";
import Block from "./block.vue";

export default {
  components: {
    accordion,
    ils,
    VideoPlayer,
    external,
    imgDesc,
    Block,
  },

  data() {
    return {};
  },

  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale);
    },
  },

  methods: {
    fnClick() {
      console.log("test");
      return false;
    },
  },
};
</script>

<style lang="scss">
.header {
  @media (min-width: 1700px) {
    max-width: 1600px;
  }

  .title {
    @media (min-width: 1700px) {
      flex: 0 0 75%;
      max-width: 75%;
    }
    @media (max-width: 575.9px) {
      margin-bottom: 30px;
    }

    h1 {
      margin-bottom: 0;
      font-family: "Noto Sans";
      font-weight: 700;
      font-size: 2.8rem;
      line-height: 2.8rem;
      background-color: $main_color;
      color: white;
      border-radius: 0 0 30px 30px;
      padding: 2% 4% 2% 4%;
      margin-top: 0;
      margin-bottom: 40px;
      position: relative;
      margin-right: 30px;

      @media (max-width: 1699.9px) {
        font-size: 2.2rem;
        line-height: 2.2rem;
        padding: 2% 4% 2.5% 4%;
      }
      @media (max-width: 1199.9px) {
        font-size: 1.9rem;
        line-height: 1.9rem;
        padding: 2% 3% 2.3% 3%;
      }
      @media (max-width: 991.9px) {
        font-size: 1.7rem;
        line-height: 1.8rem;
        padding: 2.2% 5% 3% 5%;
      }
      @media (max-width: 574.9px) {
        font-size: 1.5rem;
        line-height: 1.6rem;
        padding: 3% 5% 4% 5%;
      }
      @media (max-width: 350px) {
        font-size: 1.2rem;
        line-height: 1.3rem;
      }

      &:after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        top: 20px;
        left: 20px;
        background-color: $main_color_dark;
        border-radius: 30px;
        z-index: -1;
      }

      .nowrap {
        @media (min-width: 576px) {
          white-space: nowrap;
        }
      }
    }
    .subtitle {
      background-color: $main_color;
      color: white;
      font-weight: 200;
      font-size: 1rem;
      line-height: 1.2rem;
      // padding: 2% 4% 2% 4%;
      border-radius: 30px;
      display: inline-block;
      margin-top: 20px;

      a {
        color: white;
        text-decoration: underline;

        &:hover,
        &:focus {
          text-decoration: none;
        }
      }

      @media (max-width: 991.9px) {
        font-size: 0.9rem;
      }
    }

    .intro-block {
      @media (max-width: 767.9px) {
        margin-top: 150px;
      }
      @media (max-width: 767.9px) {
        margin-top: 130px;
      }

      button.contribute, button.warning {
        background-color: $main_color_dark;
        border-radius: 15px;
        padding: 1.5% 2.5% 1.5% 2.5%;
        margin-top: 30px;
        color: white;
        display: block;
        font-family: "Noto Sans";
        font-weight: 400;
        font-size: 1.4rem;
        text-align: left;
        border: none;

        &:hover, &:focus, &:active{
          background-color: darken($main_color_dark, 7%)!important;
        }

        @media (max-width: 1199.9px) {
          font-size: 1.2rem;
        }
        @media (max-width: 991.9px) {
          padding: 3% 5% 3% 5%;
          font-size: 1.1rem;
        }
        @media (max-width: 575.9px) {
          font-size: 1rem;
        }
      }

      button.warning{
        font-size: 0.9rem;
        padding: 1.3% 2% 1.3% 2%;
        //background-color: #3e2b56;
        background-color: $main_color_dark ;

        &:hover, &:focus, &:active{
          background-color: darken($main_color_dark, 7%)!important;
        }

        @media (max-width: 1199.9px) {
          font-size: 0.8rem;
        }
        @media (max-width: 991.9px) {
          padding: 2.7% 4.5% 2.7% 4.5%;
        }
      }
    }
  }

  .langswitch {
    position: absolute;
    top: 230px;
    right: 0;
    border-radius: 30px 0 0 30px;
    background-color: $accent_color_dark;
    padding: 15px 25px 15px 25px;
    font-family: "Noto Sans";
    font-weight: 400;
    font-size: 1.2rem;
    color: white;
    text-decoration: none;
    height: 60px;
    line-height: 30px;
    appearance: none;
    -webkit-appearance: none;
    border: none;

    transition: background-color 0.2s;
    -webkit-transition: background-color 0.2s;
    -moz-transition: background-color 0.2s;
    -o-transition: background-color 0.2s;
    -ms-transition: background-color 0.2s;

    &:hover,
    &:focus {
      background-color: darken($accent_color_dark, 7%);
      color: white;
      text-decoration: none;
    }

    @media (max-width: 575.9px) {
      font-size: 1rem;
      padding: 10px 20px 10px 20px;
      height: 50px;
    }

    @media (min-width: 290px) {
      top: 225px;
    }
    @media (min-width: 320px) {
      top: 220px;
    }
    @media (min-width: 350px) {
      top: 210px;
    }
    @media (min-width: 380px) {
      top: 210px;
    }
    @media (min-width: 576px) {
      top: 200px;
    }
    @media (min-width: 992px) {
      top: 130px;
    }
    @media (min-width: 1200px) {
      top: 150px;
    }
    @media (min-width: 1700px) {
      top: 50px;
    }
  }
}

#warning {
  h2 {
    font-family: "Noto Sans";
    font-weight: 700;
  }
  h3 {
    margin-top: 3rem;
    margin-bottom: 1.3rem;
    font-size: 1.5rem;

    &:first-child {
      margin-top: 1rem;
    }
  }

  a#fn-rf {
    color: $gray;
    text-decoration: underline !important;

    &:hover,
    &:focus {
      text-decoration: none !important;
    }
  }

  a:not(.btn) {
    text-decoration: underline;
    color: $hyperlink_blue;

    &:hover,
    &:focus {
      text-decoration: none;
      color: $hyperlink_blue;
    }
  }

  a.btn:hover a#fn-rf,
  a.btn:focus a#fn-rf {
    color: white;
  }

  #fn a {
    color: $hyperlink_blue;
  }

  button.btn,
  [role="button"].btn {
    background-color: $main_color;
    color: white;

    transition: background-color 0.2s;
    -webkit-transition: background-color 0.2s;
    -moz-transition: background-color 0.2s;
    -o-transition: background-color 0.2s;
    -ms-transition: background-color 0.2s;

    &:hover,
    &:focus,
    &:active {
      background-color: darken($main_color, 7%);
      color: white;
    }
  }

  .card-body {
    padding-top: 40px;
    padding-bottom: 40px;
  }

  .guidelines-list {
    margin-top: 30px;
    margin-bottom: 30px;
    list-style: none;

    li {
      position: relative;
      font-weight: 500;
      font-size: 1.3rem;

      &:not(:last-child) {
        margin-bottom: 15px;
      }

      &:before {
        content: "";
        position: absolute;
        width: 15px;
        height: 15px;
        left: -25px;
        top: calc(50% - 7.5px);
        background-color: $accent_color;
        border-radius: 50%;
      }
    }
  }

  .step {
    font-weight: 700;
    font-size: 1.1rem;
    margin-bottom: 0;
  }

  strong {
    font-weight: 700;
  }
}

#contribute {
  h2 {
    font-family: "Noto Sans";
    font-weight: 700;
  }
  h3 {
    margin-top: 3rem;
    margin-bottom: 1.3rem;
    font-size: 1.5rem;

    &:first-child {
      margin-top: 1rem;
    }
  }

  a#fn-rf {
    color: $gray;
    text-decoration: underline !important;

    &:hover,
    &:focus {
      text-decoration: none !important;
    }
  }

  a:not(.btn) {
    text-decoration: underline;
    color: $hyperlink_blue;

    &:hover,
    &:focus {
      text-decoration: none;
      color: $hyperlink_blue;
    }
  }

  a.btn:hover a#fn-rf,
  a.btn:focus a#fn-rf {
    color: white;
  }

  #fn a {
    color: $hyperlink_blue;
  }

  button.btn,
  [role="button"].btn {
    background-color: $main_color;
    color: white;

    transition: background-color 0.2s;
    -webkit-transition: background-color 0.2s;
    -moz-transition: background-color 0.2s;
    -o-transition: background-color 0.2s;
    -ms-transition: background-color 0.2s;

    &:hover,
    &:focus,
    &:active {
      background-color: darken($main_color, 7%);
      color: white;
    }
  }

  .card-body {
    padding-top: 40px;
    padding-bottom: 40px;
  }

  .guidelines-list {
    margin-top: 30px;
    margin-bottom: 30px;
    list-style: none;

    li {
      position: relative;
      font-weight: 500;
      font-size: 1.3rem;

      &:not(:last-child) {
        margin-bottom: 15px;
      }

      &:before {
        content: "";
        position: absolute;
        width: 15px;
        height: 15px;
        left: -25px;
        top: calc(50% - 7.5px);
        background-color: $accent_color;
        border-radius: 50%;
      }
    }
  }

  .step {
    font-weight: 700;
    font-size: 1.1rem;
    margin-bottom: 0;
  }

  strong {
    font-weight: 700;
  }
}

html.ie #contribute___BV_modal_outer_ {
  position: static !important;

  .modal-content {
    display: block;
  }
}
</style>

<i18n>

  {
    "en": {
      "partnership": "A partnership between the Canada School of Public Service and the Indigenous Training & Development Community of Practice (ITDCOP)",
      "partnership-label": "More information about this partnership",
      "contribute": "How to submit your video? Find all the details in this tab.",
      "contribute-label": "Contribute to this tool by submittting your video testimonials",
      "submit": "Consent and Submission Form",
      "close": "Close",
      "warning": "Trigger Warning and Well Being Resources",
      "warning-title":"Indigenous Learning",

      "contribute_subtitle_1": "How Do I Proceed?",
      "contribute_acc_1_title": "Your Video: Who-What-Why-How",
      "contribute_acc_2_title": "Guidelines",
      "contribute_acc_3_title": "Consent and Submit Your Video",
      "footnote": "Footnote",
      "footnote_referer": "Go to footnote referer",
      "contribute_footnote": "If you need help, write to us at ",

      "contribute_subtitle_2": "How Do I Record My Video?",
      "contribute_acc_4_title": "Narration Tips",
      "contribute_acc_5_title": "Simple Tips for Filming a Good Video",
      "contribute_acc_6_title": "Filming Your Testimonials on Microsoft Teams 365",

      "descFollows": "Image description follows",

      "helpRequest": "Request for help submitting testimonials for "
    },
    "fr": {
      "partnership": "Un partenariat entre l'École de la fonction publique du Canada et la Communauté de pratique de la Formation et développement autochtone (CPFDA)",
      "partnership-label": "Plus d'information sur ce parterariat",
      "contribute": "Comment soumettre votre vidéo? Trouvez tous les détails dans cet onglet.",
      "contribute-label": "Contribuez à cet outil en soumettant votre témoignage vidéo",
      "submit": "Formulaire de consentement et soumission",
      "close": "Fermer",
      "warning":"Avertissement et ressources en matière de bien-être",
      "warning-title":"Apprentissage sur les réalités autochtones",

      "contribute_subtitle_1": "Comment dois-je procéder?",
      "contribute_acc_1_title": "Votre vidéo : qui-quoi-pourquoi-comment",
      "contribute_acc_2_title": "Directives",
      "contribute_acc_3_title": "Consentez et soumettez votre vidéo",
      "footnote": "Note de bas de page",
      "footnote_referer": "Aller au référant de la note de bas de page",
      "contribute_footnote": "Si vous avez besoin d’aide, écrivez-nous à ",

      "contribute_subtitle_2": "Comment enregistrer ma vidéo?",
      "contribute_acc_4_title": "Conseils pour la narration",
      "contribute_acc_5_title": "Conseils faciles pour réussir une bonne vidéo",
      "contribute_acc_6_title": "Filmer votre témoignage sur <span lang=\"en\">Microsoft Teams</span> 365",

      "descFollows": "La description de l'image suit",

      "helpRequest": "Demande d'aide pour la soumission de témoignages pour "
    }
  }

</i18n>