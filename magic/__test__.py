from magic import MagicWorker
import os

if __name__ == '__main__':
    pa = os.getcwd()
    pa = pa[:pa.find('Hack_Moscow') + len('Hack_Moscow') + 1] + 'magic'
    p1 = os.path.abspath(pa + '/clusters.txt')
    p2 = os.path.abspath(pa + '/stopwords.txt')
    magic = MagicWorker(path_stopwords=p2, path_clusters=p1)
    ans = magic.predict('Не знаю, как подлкючиться к интернету')
    print(ans)