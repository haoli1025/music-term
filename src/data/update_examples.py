import json

# Read the JSON file
with open('musicTermsDataProd.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Mapping of terms to famous music pieces
music_pieces = {
    'a tempo': ('Beethoven: Symphony No. 5, 1st movement', '贝多芬：第五交响曲第一乐章'),
    'accelerando': ('Ravel: Boléro', '拉威尔：波莱罗舞曲'),
    'adagio': ('Albinoni: Adagio in G minor', '阿尔比诺尼：G小调柔板'),
    'allegretto': ('Beethoven: Symphony No. 7, 2nd movement', '贝多芬：第七交响曲第二乐章'),
    'allegro': ('Beethoven: Symphony No. 5, 1st movement', '贝多芬：第五交响曲第一乐章'),
    'andante': ('Mozart: Eine kleine Nachtmusik, 2nd movement', '莫扎特：小夜曲第二乐章'),
    'cantabile': ('Chopin: Nocturne in E-flat major, Op. 9, No. 2', '肖邦：降E大调夜曲，作品9第2号'),
    'crescendo': ('Ravel: Boléro', '拉威尔：波莱罗舞曲'),
    'da capo': ('Bach: Minuet in G', '巴赫：G大调小步舞曲'),
    'decrescendo': ('Debussy: Clair de lune', '德彪西：月光'),
    'diminuendo': ('Chopin: Nocturne in C-sharp minor', '肖邦：升C小调夜曲'),
    'dolce': ('Schubert: Ave Maria', '舒伯特：圣母颂'),
    'f': ('Beethoven: Symphony No. 5, opening', '贝多芬：第五交响曲开头'),
    'ff': ('Tchaikovsky: 1812 Overture', '柴可夫斯基：1812序曲'),
    'fine': ('Bach: Minuet in G', '巴赫：G大调小步舞曲'),
    'legato': ('Chopin: Nocturne in E-flat major', '肖邦：降E大调夜曲'),
    'mf': ('Mozart: Piano Sonata No. 11, 1st movement', '莫扎特：第11号钢琴奏鸣曲第一乐章'),
    'moderato': ('Mozart: Eine kleine Nachtmusik, 1st movement', '莫扎特：小夜曲第一乐章'),
    'mp': ('Debussy: Clair de lune', '德彪西：月光'),
    'p': ('Chopin: Nocturne in E-flat major', '肖邦：降E大调夜曲'),
    'pp': ('Debussy: Clair de lune', '德彪西：月光'),
    'rallentando': ('Chopin: Nocturne in C-sharp minor, ending', '肖邦：升C小调夜曲结尾'),
    'ritardando': ('Beethoven: Moonlight Sonata, 1st movement', '贝多芬：月光奏鸣曲第一乐章'),
    'staccato': ('Haydn: Surprise Symphony, 2nd movement', '海顿：惊愕交响曲第二乐章'),
    'alla marcia': ('Mendelssohn: Wedding March', '门德尔松：婚礼进行曲'),
    'allargando': ('Tchaikovsky: 1812 Overture, finale', '柴可夫斯基：1812序曲终曲'),
    'con moto': ('Beethoven: Symphony No. 7, 1st movement', '贝多芬：第七交响曲第一乐章'),
    'con / col': ('Beethoven: Symphony No. 5', '贝多芬：第五交响曲'),
    'dal segno': ('Bach: Minuet in G', '巴赫：G大调小步舞曲'),
    'e / ed': ('Beethoven: Symphony No. 5', '贝多芬：第五交响曲'),
    'espressivo': ('Chopin: Nocturne in E-flat major', '肖邦：降E大调夜曲'),
    'fp': ('Beethoven: Piano Sonata No. 8 (Pathétique)', '贝多芬：第8号钢琴奏鸣曲（悲怆）'),
    'grave': ('Chopin: Funeral March (Sonata No. 2)', '肖邦：葬礼进行曲（第2号奏鸣曲）'),
    'grazioso': ('Mozart: Eine kleine Nachtmusik, 3rd movement', '莫扎特：小夜曲第三乐章'),
    'largo': ('Handel: Largo from Xerxes', '亨德尔：赛尔斯的广板'),
    'lento': ('Barber: Adagio for Strings', '巴伯：弦乐柔板'),
    'ma': ('Beethoven: Symphony No. 5', '贝多芬：第五交响曲'),
    'meno': ('Beethoven: Symphony No. 5', '贝多芬：第五交响曲'),
    'meno mosso': ('Chopin: Nocturne in C-sharp minor', '肖邦：升C小调夜曲'),
    'molto': ('Vivaldi: The Four Seasons, Spring', '维瓦尔第：四季-春'),
    'non troppo': ('Beethoven: Symphony No. 5', '贝多芬：第五交响曲'),
    'più': ('Beethoven: Symphony No. 5', '贝多芬：第五交响曲'),
    'più mosso': ('Vivaldi: The Four Seasons, Summer', '维瓦尔第：四季-夏'),
    'poco / poco a poco': ('Ravel: Boléro', '拉威尔：波莱罗舞曲'),
    'presto': ('Vivaldi: The Four Seasons, Summer, 3rd movement', '维瓦尔第：四季-夏第三乐章'),
    'ritenuto': ('Tchaikovsky: 1812 Overture', '柴可夫斯基：1812序曲'),
    'senza': ('Bach: Cello Suite No. 1', '巴赫：第一号大提琴组曲'),
    'vivace / vivo': ('Vivaldi: The Four Seasons, Spring', '维瓦尔第：四季-春'),
    'agitato': ('Beethoven: Moonlight Sonata, 3rd movement', '贝多芬：月光奏鸣曲第三乐章'),
    'andantino': ('Mozart: Eine kleine Nachtmusik, 2nd movement', '莫扎特：小夜曲第二乐章'),
    'animato': ('Vivaldi: The Four Seasons, Spring', '维瓦尔第：四季-春'),
    'ben': ('Beethoven: Symphony No. 5', '贝多芬：第五交响曲'),
    'con forza': ('Beethoven: Symphony No. 5, 1st movement', '贝多芬：第五交响曲第一乐章'),
    'energico': ('Beethoven: Symphony No. 5, 1st movement', '贝多芬：第五交响曲第一乐章'),
    'giocoso': ('Mozart: Eine kleine Nachtmusik, 4th movement', '莫扎特：小夜曲第四乐章'),
    'leggiero': ('Mozart: Eine kleine Nachtmusik, 3rd movement', '莫扎特：小夜曲第三乐章'),
    'maestoso': ('Handel: Messiah, Hallelujah Chorus', '亨德尔：弥赛亚-哈利路亚合唱'),
    'marcato': ('Beethoven: Symphony No. 5, 1st movement', '贝多芬：第五交响曲第一乐章'),
    'pesante': ('Beethoven: Symphony No. 5', '贝多芬：第五交响曲'),
    'prestissimo': ('Vivaldi: The Four Seasons, Summer, 3rd movement', '维瓦尔第：四季-夏第三乐章'),
    'prima / primo': ('Mozart: Sonata for Two Pianos', '莫扎特：双钢琴奏鸣曲'),
    'risoluto': ('Beethoven: Symphony No. 5, 1st movement', '贝多芬：第五交响曲第一乐章'),
    'scherzando': ('Mendelssohn: A Midsummer Night\'s Dream, Scherzo', '门德尔松：仲夏夜之梦-谐谑曲'),
    'semplice': ('Bach: Air on the G String', '巴赫：G弦上的咏叹调'),
    'sempre': ('Beethoven: Symphony No. 5', '贝多芬：第五交响曲'),
    'sforzando': ('Beethoven: Symphony No. 5, opening', '贝多芬：第五交响曲开头'),
    'simile': ('Bach: Minuet in G', '巴赫：G大调小步舞曲'),
    'sostenuto': ('Chopin: Nocturne in E-flat major', '肖邦：降E大调夜曲'),
    'subito': ('Beethoven: Piano Sonata No. 8 (Pathétique)', '贝多芬：第8号钢琴奏鸣曲（悲怆）'),
    'tranquillo': ('Debussy: Clair de lune', '德彪西：月光'),
    'triste / tristamente': ('Chopin: Funeral March', '肖邦：葬礼进行曲'),
    'affettuoso': ('Schubert: Ave Maria', '舒伯特：圣母颂'),
    'alla breve': ('Bach: Brandenburg Concerto No. 3', '巴赫：第三号勃兰登堡协奏曲'),
    'amabile': ('Mozart: Eine kleine Nachtmusik, 2nd movement', '莫扎特：小夜曲第二乐章'),
    'appassionato': ('Beethoven: Appassionata Sonata', '贝多芬：热情奏鸣曲'),
    'assai': ('Vivaldi: The Four Seasons', '维瓦尔第：四季'),
    'come prima': ('Bach: Minuet in G', '巴赫：G大调小步舞曲'),
    'comodo / tempo comodo': ('Mozart: Eine kleine Nachtmusik', '莫扎特：小夜曲'),
    'con brio': ('Beethoven: Symphony No. 7, 1st movement', '贝多芬：第七交响曲第一乐章'),
    'deciso': ('Beethoven: Symphony No. 5, 1st movement', '贝多芬：第五交响曲第一乐章'),
    'larghetto': ('Handel: Largo from Xerxes', '亨德尔：赛尔斯的广板'),
    'mesto': ('Chopin: Funeral March', '肖邦：葬礼进行曲'),
    'misterioso': ('Debussy: Clair de lune', '德彪西：月光'),
    'ritmico': ('Ravel: Boléro', '拉威尔：波莱罗舞曲'),
    'rubato / tempo rubato': ('Chopin: Nocturne in E-flat major', '肖邦：降E大调夜曲'),
    'stringendo': ('Ravel: Boléro, finale', '拉威尔：波莱罗舞曲终曲'),
    'animé': ('Debussy: Clair de lune', '德彪西：月光'),
    'douce': ('Schubert: Ave Maria', '舒伯特：圣母颂'),
    'lent': ('Barber: Adagio for Strings', '巴伯：弦乐柔板'),
    'modéré': ('Mozart: Eine kleine Nachtmusik', '莫扎特：小夜曲'),
    'retenu': ('Chopin: Nocturne in C-sharp minor', '肖邦：升C小调夜曲'),
    'vite': ('Vivaldi: The Four Seasons, Summer', '维瓦尔第：四季-夏'),
    'a niente': ('Debussy: Clair de lune, ending', '德彪西：月光结尾'),
    'ad libitum': ('Mozart: Piano Concerto No. 21, cadenza', '莫扎特：第21号钢琴协奏曲华彩段'),
    'attacca': ('Beethoven: Symphony No. 5, movements 3-4', '贝多芬：第五交响曲第三至四乐章'),
    'cantando': ('Schubert: Ave Maria', '舒伯特：圣母颂'),
    'con dolore': ('Chopin: Funeral March', '肖邦：葬礼进行曲'),
    'con spirito': ('Vivaldi: The Four Seasons, Spring', '维瓦尔第：四季-春'),
    'doloroso': ('Chopin: Funeral March', '肖邦：葬礼进行曲'),
    'largamente': ('Handel: Largo from Xerxes', '亨德尔：赛尔斯的广板'),
    'morendo': ('Chopin: Nocturne in C-sharp minor, ending', '肖邦：升C小调夜曲结尾'),
    'perdendosi': ('Debussy: Clair de lune, ending', '德彪西：月光结尾'),
    'quasi': ('Beethoven: Moonlight Sonata', '贝多芬：月光奏鸣曲'),
    'rinforzando': ('Beethoven: Symphony No. 5, opening', '贝多芬：第五交响曲开头'),
    'smorzando': ('Chopin: Nocturne in C-sharp minor, ending', '肖邦：升C小调夜曲结尾'),
    'sonoro': ('Tchaikovsky: 1812 Overture', '柴可夫斯基：1812序曲'),
    'sotto voce': ('Chopin: Nocturne in E-flat major', '肖邦：降E大调夜曲'),
    'langsam': ('Bach: Air on the G String', '巴赫：G弦上的咏叹调'),
    'lebhaft': ('Vivaldi: The Four Seasons, Spring', '维瓦尔第：四季-春'),
    'mässig': ('Mozart: Eine kleine Nachtmusik', '莫扎特：小夜曲'),
    'ruhig': ('Bach: Air on the G String', '巴赫：G弦上的咏叹调'),
    'schnell': ('Vivaldi: The Four Seasons, Summer', '维瓦尔第：四季-夏'),
    'traurig': ('Chopin: Funeral March', '肖邦：葬礼进行曲')
}

# Update each term
for term in data:
    term_name = term['term'].lower()
    if term_name in music_pieces:
        term['example'] = music_pieces[term_name][0]
        term['exampleChinese'] = music_pieces[term_name][1]
    else:
        # Fallback for terms not in mapping - use a generic piece
        term['example'] = 'Classical music piece'
        term['exampleChinese'] = '古典音乐作品'

# Write back to file
with open('musicTermsDataProd.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=4, ensure_ascii=False)

print(f'Updated {len(data)} terms with famous music pieces!')

