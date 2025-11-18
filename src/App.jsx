<Router>

  {/* 🚪 登录页不需要 AuthGate */}
  <Routes>
    <Route path="/loginwallet" element={<LoginWallet />} />
  </Routes>

  {/* 🔐 已登录内容全部在 AuthGate 里 */}
  <AuthGate>
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />

      <Route
        path="/market"
        element={
          <Layout>
            <Market />
          </Layout>
        }
      />

      <Route
        path="/coin/:id"
        element={
          <Layout>
            <CoinDetail />
          </Layout>
        }
      />

      <Route
        path="/trade"
        element={
          <Layout>
            <Trade />
          </Layout>
        }
      />

      <Route
        path="/wallet"
        element={
          <Layout>
            <Wallet />
          </Layout>
        }
      />

      {/* 不带 Layout 的保持不变 */}
      <Route path="/asset/:symbol" element={<AssetDetail />} />
      <Route path="/wallet/:symbol/deposit" element={<Deposit />} />
      <Route path="/wallet/:symbol/withdraw" element={<Withdraw />} />
      <Route path="/deposit1" element={<Deposit1 />} />
      <Route path="/withdraw1" element={<Withdraw1 />} />
      <Route path="/buycrypto1" element={<BuyCrypto1 />} />
      <Route path="/deposit/:symbol" element={<Deposit />} />
      <Route path="/withdraw/:symbol" element={<Withdraw />} />
      <Route path="/coin/:symbol" element={<CoinDetail />} />

      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/user" element={<UserCenter />} />
      <Route path="/user/mail" element={<Mail />} />
      <Route path="/user/bank" element={<BankCard />} />
      <Route path="/user/language" element={<Language />} />
      <Route path="/user/withdrawal-password" element={<WithdrawalPassword />} />
      <Route path="/intro" element={<Introduction />} />
      <Route path="/defi" element={<Pledge />} />
      <Route path="/defi-record" element={<DeFiRecord />} />
      <Route path="/user/msb" element={<MSBCertification />} />
    </Routes>
  </AuthGate>

</Router>
